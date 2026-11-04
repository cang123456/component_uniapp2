#!/usr/bin/env node
/**
 * 组件元数据生成器（零第三方依赖）
 *
 * 作用：
 *  1. 为 uni_modules/ 下每个组件补齐 package.json（id + easycom custom 映射）
 *  2. 直接从 .vue 源码提取 props / emits / slots，生成 readme.md
 *
 * 设计：默认只生成「不存在」的文件，绝不覆盖已手工精修的文档，可反复运行。
 *       想按最新源码全量重建，加 --force。
 *       新增组件时：在下方 C 清单里加一行 → node scripts/gen-meta.js 即可。
 *
 * 用法：node scripts/gen-meta.js  [--force]
 */
'use strict'

const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const modulesDir = path.join(root, 'uni_modules')
const FORCE = process.argv.indexOf('--force') !== -1

// [id, 中文名, 描述, 关键词(逗号分隔), 分类, 用法示例, API 速记]
const C = [
  ['kit-button', '按钮', '零依赖、多端通用的按钮，支持 6 种主题 / 4 种尺寸 / 镂空 / 圆角 / 加载 / 禁用', 'button,按钮', '基础', '<kit-button type="primary" @click="save">保存</kit-button>', 'type/size/plain/round/block/disabled/loading/text 控制外观与状态，click 为点击事件'],
  ['kit-tag', '标签', '零依赖、多端通用的标签，支持 6 种主题 / 镂空 / 圆角 / 可关闭', 'tag,标签', '基础', '<kit-tag type="success" closable @close="onClose">已完成</kit-tag>', 'closable 打开关闭按钮，close 不会冒泡触发 click'],
  ['kit-card', '卡片', '零依赖、多端通用的卡片容器，支持标题 / 额外信息 / 四个插槽', 'card,卡片', '基础', '<kit-card title="订单信息" extra="查看更多">内容</kit-card>', 'header / extra / default / footer 四个插槽；padding、radius、shadow、border 可调'],
  ['kit-empty', '空状态', '零依赖空状态占位，插图由纯 CSS 绘制，无任何图片资源依赖', 'empty,空状态', '基础', '<kit-empty text="暂无订单" description="下单后可查看" />', 'image 插槽可替换插图，default 插槽放操作按钮'],
  ['kit-dialog', '对话框', '零依赖模态对话框，受控显隐，支持自定义内容与底部按钮', 'dialog,弹窗', '反馈', '<kit-dialog v-model:show="visible" title="提示" content="确定删除？" @confirm="ok" />', 'show 受控；confirm/cancel/close/update:show 四个事件；Vue2 用 :show + @update:show'],

  ['kit-input', '输入框', '带边框、可清空的单行输入框，双兼容 v-model', 'input,输入框,表单', '表单', '<kit-input v-model="name" placeholder="请输入姓名" clearable />', 'type/password/maxlength/clearable/error；事件 input/change/focus/blur/confirm/clear'],
  ['kit-textarea', '多行输入框', '带字数统计的多行输入框，双兼容 v-model', 'textarea,文本域,表单', '表单', '<kit-textarea v-model="content" :maxlength="200" />', 'showCount 控制字数统计，autoHeight 自适应高度'],
  ['kit-search', '搜索框', '纯 CSS 放大镜图标的搜索框，双兼容 v-model', 'search,搜索,表单', '表单', '<kit-search v-model="keyword" @search="doSearch" />', 'showAction 控制右侧按钮；事件 search/clear/action'],
  ['kit-switch', '开关', '纯 CSS 滑动开关，双兼容 v-model（Boolean）', 'switch,开关,表单', '表单', '<kit-switch v-model="enabled" active-color="#18b566" />', 'activeColor/inactiveColor/size/disabled；change 返回新布尔值'],
  ['kit-stepper', '步进器', '加减数量的步进器，带上下限与手动输入，双兼容 v-model', 'stepper,步进器,表单', '表单', '<kit-stepper v-model="count" :min="1" :max="9" />', 'min/max/step/integer/editable；超出范围自动夹取'],
  ['kit-rate', '评分', '星标评分，字符绘制无字体依赖，双兼容 v-model', 'rate,评分,表单', '表单', '<kit-rate v-model="score" :count="5" />', 'count/size/color/voidColor/disabled/readonly；change 返回分值'],
  ['kit-radio', '单选组', '基于 options 数组的单选组，避免小程序端跨组件通信问题', 'radio,单选,表单', '表单', '<kit-radio v-model="picked" :options="[\'A\',\'B\']" inline />', 'options 支持字符串或 {label,value,disabled}；inline 横向排列'],
  ['kit-checkbox', '多选组', '基于 options 数组的多选组，值为数组，支持 max 上限', 'checkbox,多选,表单', '表单', '<kit-checkbox v-model="checked" :options="opts" :max="3" />', 'change 返回选中值数组；超限时触发 overlimit'],

  ['kit-toast', '轻提示', '受控显隐的轻提示，自动关闭，支持四种状态与三种位置', 'toast,提示,反馈', '反馈', '<kit-toast v-model:show="visible" message="保存成功" type="success" />', 'duration 毫秒，传 0 表示由页面控制关闭；position: center/top/bottom'],
  ['kit-loading', '加载指示器', '纯 CSS 转圈 / 跳点加载动画，可带文案', 'loading,加载,反馈', '反馈', '<kit-loading text="加载中" type="spinner" />', 'type: spinner/dots；vertical 控制图文方向'],
  ['kit-popup', '弹出层', '五向弹出层（上/下/左/右/中），内容完全由插槽提供', 'popup,弹出层,反馈', '反馈', '<kit-popup v-model:show="visible" position="bottom"><view>内容</view></kit-popup>', '受控 show；round/maskClosable/bgColor/width/height'],
  ['kit-action-sheet', '动作面板', '底部动作面板，基于 actions 数组，点击自动关闭', 'action-sheet,动作面板,反馈', '反馈', '<kit-action-sheet v-model:show="visible" :actions="actions" @select="onSelect" />', 'select 返回 (index, action)；cancel/close/update:show'],
  ['kit-notice-bar', '通知栏', '纯 CSS 滚动文字通知栏，支持关闭 / 跳转 / 四种语义色', 'notice-bar,通知栏,反馈', '反馈', '<kit-notice-bar text="系统维护通知" type="warning" closeable />', 'scrollable/speed 控制滚动；closeable/showLink 控制右侧操作'],
  ['kit-progress', '进度条', '百分比自动夹取的进度条，支持圆角、文案、呼吸动画', 'progress,进度条,反馈', '反馈', '<kit-progress :percentage="65" active />', 'percentage 0-100；color/bgColor/strokeWidth/showText/active'],

  ['kit-badge', '徽标', '角标 / 小红点，用默认插槽包裹任意内容', 'badge,徽标,展示', '展示', '<kit-badge :value="8"><kit-avatar text="我" /></kit-badge>', 'dot 切小红点；max 超过显示 N+；showZero 控制 0 是否显示'],
  ['kit-icon', '图标', '通用文本符号图标，零字体文件 / 零图片依赖', 'icon,图标,展示', '展示', '<kit-icon name="success" color="#18b566" size="40rpx" />', 'name 可传内置名或直接传字符；支持 20+ 常用符号'],
  ['kit-avatar', '头像', '图片 / 文字头像，图片由调用方传入，组件不携带资源', 'avatar,头像,展示', '展示', '<kit-avatar text="张三" shape="square" />', 'src/text/size/shape/bgColor/color；default 插槽可完全自定义'],
  ['kit-divider', '分割线', '可带文字 / 插槽的分割线，支持虚线', 'divider,分割线,展示', '展示', '<kit-divider text="没有更多了" dashed />', 'text 或 default 插槽会在中间渲染；color/textColor 可调'],

  ['kit-cell', '单元格', '列表项单元格，支持图标、标题、描述、右侧值与箭头', 'cell,单元格,列表', '导航', '<kit-cell title="我的订单" value="3" arrow clickable @click="go" />', 'icon/label/value/right 插槽；多个 kit-cell 直接 v-for 包一层容器'],
  ['kit-tabs', '标签页', '标签头组件（内容由页面根据 change 自己切换），双兼容 v-model', 'tabs,标签页,导航', '导航', '<kit-tabs v-model="active" :tabs="[\'全部\',\'待付款\']" />', '绑定选中索引；color/lineColor；change 返回索引'],
  ['kit-steps', '步骤条', '横向 / 竖向步骤条，steps 数组驱动', 'steps,步骤条,导航', '导航', '<kit-steps :steps="steps" :active="1" direction="horizontal" />', 'steps 支持字符串或 {title,desc}；active 为当前步骤索引'],
  ['kit-load-more', '加载更多', '列表底部状态提示：加载中 / 更多 / 没有更多 / 失败重试', 'load-more,加载更多,导航', '导航', '<kit-load-more status="loading" @click="load" />', '四种文案均可通过 props 覆盖；fail 时点击触发 click'],
  ['kit-skeleton', '骨架屏', '骨架占位，loading 为 false 时自动显示插槽里的真实内容', 'skeleton,骨架屏,导航', '导航', '<kit-skeleton :loading="loading" :rows="3" avatar title>真实内容</kit-skeleton>', 'rows/avatar/title/animate；可直接包裹页面区域']
]

const WARN = []

function readVue(id) {
  const file = path.join(modulesDir, id, 'components', id, id + '.vue')
  if (!fs.existsSync(file)) {
    WARN.push(id + ': 缺少 ' + path.relative(root, file).replace(/\\/g, '/'))
    return ''
  }
  return fs.readFileSync(file, 'utf8')
}

/** 取顶层花括号块：从 startIdx 的 '{' 开始做括号配对 */
function braceBlock(src, startIdx) {
  const begin = src.indexOf('{', startIdx)
  if (begin === -1) return ''
  let depth = 0
  let quote = ''
  for (let i = begin; i < src.length; i++) {
    const ch = src[i]
    if (quote) {
      if (ch === quote && src[i - 1] !== '\\') quote = ''
      continue
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue }
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) return src.slice(begin + 1, i)
    }
  }
  return ''
}

/** 按顶层逗号切分（忽略字符串/括号内的逗号） */
function splitTop(str, sep) {
  const out = []
  let depth = 0
  let quote = ''
  let buf = ''
  for (let i = 0; i < str.length; i++) {
    const ch = str[i]
    if (quote) {
      buf += ch
      if (ch === quote && str[i - 1] !== '\\') quote = ''
      continue
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; buf += ch; continue }
    if (ch === '{' || ch === '(' || ch === '[') depth++
    if (ch === '}' || ch === ')' || ch === ']') depth--
    if (ch === sep && depth === 0) { out.push(buf.trim()); buf = ''; continue }
    buf += ch
  }
  if (buf.trim()) out.push(buf.trim())
  return out
}

function clean(v) {
  return String(v || '').trim().replace(/\s+/g, ' ').replace(/\|/g, '\\|') || '—'
}

function extractProps(src) {
  const script = (src.match(/<script[^>]*>([\s\S]*?)<\/script>/) || [])[1] || ''
  const idx = script.search(/\bprops\s*:/)
  if (idx === -1) return []
  const block = braceBlock(script, idx)
  return splitTop(block, ',').map(function (entry) {
    const m = entry.match(/^['"]?([\w-]+)['"]?\s*:\s*([\s\S]+)$/)
    if (!m) return null
    const body = m[2].trim()
    if (body.charAt(0) !== '{') return { key: m[1], type: clean(body), def: '—' }
    const inner = body.slice(1, body.lastIndexOf('}'))
    const typeM = inner.match(/type:\s*([\s\S]+?)(?=,\s*default\s*:|$)/)
    const defM = inner.match(/default:\s*([\s\S]+)$/)
    return {
      key: m[1],
      type: clean(typeM ? typeM[1].replace(/,\s*$/, '') : ''),
      def: clean(defM ? defM[1].replace(/,\s*$/, '') : '')
    }
  }).filter(Boolean)
}

function extractEmits(src) {
  const m = src.match(/\bemits:\s*\[([^\]]*)\]/)
  if (!m) return []
  return (m[1].match(/['"]([^'"]+)['"]/g) || []).map(function (s) {
    return s.slice(1, -1)
  })
}

function extractSlots(src) {
  const tpl = (src.match(/<template[^>]*>([\s\S]*)<\/template>/) || [])[1] || ''
  const out = []
  const re = /<slot\b([^>]*)>/g
  let m
  while ((m = re.exec(tpl)) !== null) {
    const n = m[1].match(/name\s*=\s*["']([^"']+)["']/)
    out.push(n ? n[1] : 'default')
  }
  return out.filter(function (v, i, a) { return a.indexOf(v) === i })
}

function buildPackage(item) {
  return {
    id: item[0],
    displayName: item[0] + ' ' + item[1],
    version: '1.0.0',
    description: item[2],
    keywords: item[3].split(',').concat(['uni-app', 'kit-ui']),
    license: 'MIT',
    engines: { HBuilderX: '^3.1.0' },
    dcloudext: {
      category: ['前端组件', '通用组件'],
      sale: { regular: { price: '0.00' } },
      contact: { qq: '' },
      declaration: { ads: '无', data: '插件不采集任何数据', permissions: '无' },
      npmurl: ''
    },
    easycom: {
      custom: { ['^' + item[0] + '$']: '@/uni_modules/' + item[0] + '/components/' + item[0] + '/' + item[0] + '.vue' }
    }
  }
}

function buildReadme(item, src) {
  const props = extractProps(src)
  const emits = extractEmits(src)
  const slots = extractSlots(src)
  const L = []
  L.push('# ' + item[0] + ' ' + item[1], '')
  L.push(item[2] + '。', '')
  L.push('> 零依赖、单文件自包含。复制 `uni_modules/' + item[0] + '/` 到目标项目根目录即可；')
  L.push('> 完整接入方式与多端约定见库根目录 `README.md`。', '')
  L.push('## 用法', '', '```vue', item[5], '```', '')
  L.push('**API 速记**：' + item[6] + '。', '')
  L.push('## Props', '')
  if (props.length) {
    L.push('| 属性 | 类型 | 默认值 |', '| --- | --- | --- |')
    props.forEach(function (p) { L.push('| `' + p.key + '` | ' + p.type + ' | ' + p.def + ' |') })
  } else L.push('无')
  L.push('')
  L.push('## Events', '')
  if (emits.length) {
    L.push('| 事件 | 说明 |', '| --- | --- |')
    emits.forEach(function (e) { L.push('| `' + e + '` | 组件内 `$emit` 抛出，用 `@' + e + '` 监听 |') })
  } else L.push('无（纯展示组件）')
  L.push('')
  L.push('## Slots', '')
  if (slots.length) {
    L.push('| 插槽 | 说明 |', '| --- | --- |')
    slots.forEach(function (s) { L.push('| `' + s + '` | ' + (s === 'default' ? '默认内容区' : '具名插槽') + ' |') })
  } else L.push('无')
  L.push('')
  return L.join('\n')
}

// ---- 主流程 ----
if (!fs.existsSync(modulesDir)) {
  console.error('找不到 uni_modules/ 目录')
  process.exit(1)
}

const known = C.map(function (c) { return c[0] })
fs.readdirSync(modulesDir).forEach(function (dir) {
  if (dir.charAt(0) === '.') return
  if (known.indexOf(dir) === -1 && fs.statSync(path.join(modulesDir, dir)).isDirectory()) {
    WARN.push(dir + ': 目录存在但未登记在 scripts/gen-meta.js 的组件清单里')
  }
})

let pkgCount = 0
let docCount = 0

C.forEach(function (item) {
  const id = item[0]
  const src = readVue(id)
  if (!src) return
  const pkgFile = path.join(modulesDir, id, 'package.json')
  const docFile = path.join(modulesDir, id, 'readme.md')

  if (FORCE || !fs.existsSync(pkgFile)) {
    fs.writeFileSync(pkgFile, JSON.stringify(buildPackage(item), null, 2) + '\n', 'utf8')
    pkgCount++
  }
  if (FORCE || !fs.existsSync(docFile)) {
    fs.writeFileSync(docFile, buildReadme(item, src), 'utf8')
    docCount++
  }
})

console.log('组件清单：' + C.length + ' 个')
console.log('生成 package.json：' + pkgCount + ' 个；生成 readme.md：' + docCount + ' 个' +
  (FORCE ? '（--force 全量重建）' : '（仅补齐缺失文件，已存在的文档保持不变）'))
if (WARN.length) {
  console.log('\n需要注意：')
  WARN.forEach(function (w) { console.log('  - ' + w) })
}
