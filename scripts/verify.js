#!/usr/bin/env node
/**
 * uni-kit-ui 组件库自检（零第三方依赖）
 *
 * 检查内容：
 *  1. uni_modules 目录 / 三层同名路径是否符合 easycom 规范
 *  2. 每个组件 package.json 合法性、id 一致性、easycom 映射目标是否存在
 *  3. 组件是否单文件自包含（无外部 import、无 scss/less、style 带 scoped）
 *  4. 组件 name、emits 声明、<script> 块 JS 语法
 *  5. index.js 是否导出全部组件、语法是否正确
 *  6. pages.json 是否可解析
 *
 * 用法：node scripts/verify.js   （或 npm run verify）
 */
'use strict'

const fs = require('fs')
const os = require('os')
const path = require('path')
const { spawnSync } = require('child_process')

const root = path.resolve(__dirname, '..')
const modulesDir = path.join(root, 'uni_modules')
const errors = []
const rows = []

function rel(p) {
  return path.relative(root, p).replace(/\\/g, '/')
}

function fail(msg) {
  errors.push(msg)
}

function firstLine(text) {
  return String(text || '').trim().split('\n')[0] || '未知错误'
}

function stripComments(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1')
}

function readJson(file, label) {
  if (!fs.existsSync(file)) {
    fail(label + ': 文件不存在 -> ' + rel(file))
    return null
  }
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch (e) {
    fail(label + ': JSON 解析失败 -> ' + e.message)
    return null
  }
}

function checkJsSyntax(code, label) {
  const tmp = path.join(
    os.tmpdir(),
    'kit-verify-' + process.pid + '-' + Math.random().toString(36).slice(2) + '.mjs'
  )
  fs.writeFileSync(tmp, code, 'utf8')
  try {
    const r = spawnSync(process.execPath, ['--check', tmp], { encoding: 'utf8' })
    if (r.status !== 0) fail(label + ': JS 语法错误 -> ' + firstLine(r.stderr))
  } finally {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp)
  }
}

function blockOf(src, tag) {
  const m = src.match(new RegExp('<' + tag + '[^>]*>([\\s\\S]*?)</' + tag + '>'))
  return m ? m[1] : ''
}

/** 最外层 template 块（贪婪，避免被插槽里的 </template> 提前截断） */
function templateOf(src) {
  const m = src.match(/<template[^>]*>([\s\S]*)<\/template>/)
  return m ? m[1] : ''
}

/** 轻量标签配对检查：无法替代编译，但能抓出漏写的闭合标签 */
function checkTemplateBalance(src, label) {
  const tpl = templateOf(src)
  if (!tpl) {
    fail(label + ': 缺少 <template> 块')
    return
  }
  const voidTags = ['image', 'input', 'br', 'hr', 'meta', 'link']
  const re = /<(\/?)([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^>])*?)(\/?)>/g
  const stack = []
  let m
  let count = 0
  while ((m = re.exec(tpl)) !== null) {
    count++
    const closing = m[1] === '/'
    const tag = m[2].toLowerCase()
    if (voidTags.indexOf(tag) !== -1 || m[4] === '/') continue
    if (closing) {
      const top = stack.pop()
      if (top !== tag) {
        fail(label + ': 标签闭合顺序错误，遇到 </' + tag + '> 但期望 </' + (top || '无') + '>')
        return
      }
    } else {
      stack.push(tag)
    }
  }
  if (!count) fail(label + ': 模板中没有解析到任何标签，请确认模板内容是否正确')
  if (stack.length) fail(label + ': 以下标签未闭合 -> ' + stack.join(', '))
}

// ---------- 1. 遍历组件 ----------
const ids = fs.existsSync(modulesDir)
  ? fs.readdirSync(modulesDir).filter(function (n) {
      return !n.startsWith('.') && fs.statSync(path.join(modulesDir, n)).isDirectory()
    })
  : []

if (ids.length === 0) fail('uni_modules/ 下没有找到任何组件目录')

ids.forEach(function (id) {
  const dir = path.join(modulesDir, id)
  const vueFile = path.join(dir, 'components', id, id + '.vue')
  const pkgFile = path.join(dir, 'package.json')
  const readmeFile = path.join(dir, 'readme.md')
  const flags = { vue: 'NO', pkg: 'NO', doc: 'NO', scoped: 'NO', alone: 'NO', emits: 'NO', js: 'NO' }

  // 组件文件
  if (!fs.existsSync(vueFile)) {
    fail(id + ': 缺少规范路径 -> ' + rel(vueFile))
  } else {
    flags.vue = 'OK'
    const src = fs.readFileSync(vueFile, 'utf8')
    const script = blockOf(src, 'script')

    if (!/<style[^>]*\bscoped/.test(src)) {
      fail(id + ': <style> 必须加 scoped（H5 端会污染全局样式）')
    } else {
      flags.scoped = 'OK'
    }
    if (/<style[^>]*\blang\s*=/.test(src)) {
      fail(id + ': 不要使用 scss/less，宿主项目可能没装对应编译器')
    }
    if (!script.trim()) {
      fail(id + ': 缺少 <script> 块')
    } else {
      const clean = stripComments(script)

      if (/\bimport\s|\brequire\s*\(/.test(clean)) {
        fail(id + ': <script> 内不应 import/require 外部文件（组件必须自包含）')
      } else {
        flags.alone = 'OK'
      }

      const nameMatch = clean.match(/name:\s*['"]([^'"]+)['"]/)
      if (!nameMatch) {
        fail(id + ': 缺少 name 选项')
      } else if (nameMatch[1] !== id) {
        fail(id + ': name("' + nameMatch[1] + '") 与目录名不一致')
      }

      const emitsMatch = clean.match(/emits:\s*\[([^\]]*)\]/)
      const emitsBlock = emitsMatch ? emitsMatch[1] : ''
      const emitNames = []
      const emitRe = /\$emit\(\s*['"]([^'"]+)['"]/g
      let em
      while ((em = emitRe.exec(clean)) !== null) emitNames.push(em[1])
      if (emitNames.length && !emitsMatch) {
        fail(id + ': 有 $emit 但没声明 emits（Vue3 下事件会被当作原生事件透传）')
      }
      emitNames.forEach(function (n) {
        if (emitsBlock.indexOf(n) === -1) fail(id + ': emits 未声明事件 "' + n + '"')
      })
      if (emitsMatch || !emitNames.length) flags.emits = 'OK'

      checkTemplateBalance(src, id)
      checkJsSyntax(script, id + ' <script>')
      flags.js = 'OK'
    }
  }

  // package.json
  const pkg = readJson(pkgFile, id)
  if (pkg) {
    flags.pkg = 'OK'
    if (pkg.id !== id) fail(id + ': package.json 的 id("' + pkg.id + '") 与目录名不一致')
    if (!pkg.version) fail(id + ': package.json 缺少 version')
    const custom = pkg.easycom && pkg.easycom.custom
    if (!custom || !Object.keys(custom).length) {
      fail(id + ': package.json 缺少 easycom.custom 映射')
    } else {
      Object.keys(custom).forEach(function (k) {
        const target = custom[k]
        const abs = path.join(root, String(target).replace(/^@\//, ''))
        if (!fs.existsSync(abs)) fail(id + ': easycom 目标不存在 -> ' + target)
      })
    }
  }

  if (fs.existsSync(readmeFile)) flags.doc = 'OK'
  else fail(id + ': 缺少 readme.md')

  rows.push({ id: id, flags: flags })
})

// ---------- 1.1 演示页（存在才检查，不属于分发内容） ----------
const demoFile = path.join(root, 'pages', 'index', 'index.vue')
if (fs.existsSync(demoFile)) {
  const demo = fs.readFileSync(demoFile, 'utf8')
  checkTemplateBalance(demo, 'pages/index/index.vue')
  const demoScript = blockOf(demo, 'script')
  if (demoScript.trim()) checkJsSyntax(demoScript, 'pages/index/index.vue <script>')
}

// ---------- 2. 根入口 ----------
const entryFile = path.join(root, 'index.js')
if (fs.existsSync(entryFile)) {
  const entry = fs.readFileSync(entryFile, 'utf8')
  ids.forEach(function (id) {
    if (entry.indexOf('uni_modules/' + id + '/') === -1) fail('index.js 未导出组件 ' + id)
  })
  checkJsSyntax(entry, 'index.js')
} else {
  fail('缺少根入口 index.js')
}

// ---------- 3. pages.json（允许 // 注释） ----------
const pagesFile = path.join(root, 'pages.json')
if (fs.existsSync(pagesFile)) {
  const raw = fs.readFileSync(pagesFile, 'utf8')
  try {
    JSON.parse(stripComments(raw))
  } catch (e) {
    fail('pages.json 解析失败 -> ' + e.message)
  }
} else {
  fail('缺少 pages.json')
}

// ---------- 输出 ----------
console.log('\nuni-kit-ui 组件自检  (' + ids.length + ' 个组件)\n')
console.log('ID'.padEnd(19) + 'vue   pkg   doc   scoped  alone  emits  js')
console.log('-'.repeat(70))
rows.forEach(function (r) {
  const f = r.flags
  console.log(
    r.id.padEnd(19) +
      f.vue.padEnd(6) + f.pkg.padEnd(6) + f.doc.padEnd(6) +
      f.scoped.padEnd(7) + f.alone.padEnd(7) + f.emits.padEnd(7) + f.js
  )
})

if (errors.length) {
  console.error('\n发现 ' + errors.length + ' 个问题：')
  errors.forEach(function (e, i) { console.error('  ' + (i + 1) + '. ' + e) })
  console.error('')
  process.exit(1)
}

console.log('\n全部通过：结构、元数据、自包含性、语法均正常。')
console.log('分发时把 uni_modules/ 目录整体复制到目标项目根目录即可。\n')
