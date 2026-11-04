#!/usr/bin/env node
/**
 * 把 uni_modules/ 打成可直接分发的 zip（零第三方依赖，ZIP store 格式）
 *
 * 为什么不用系统压缩命令：Windows 的 Compress-Archive 会把包内路径写成反斜杠，
 * 在 macOS / Linux 上解压会变成一坨带反斜杠的文件名。这里统一写正斜杠。
 *
 * 用法：node scripts/pack.js   （或 npm run zip）
 */
'use strict'

const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const sourceDir = path.join(root, 'uni_modules')
const outFile = path.join(root, 'uni-kit-ui-uni_modules.zip')

// ---- CRC32 ----
const crcTable = (function () {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1)
    table[n] = c >>> 0
  }
  return table
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function dosTime(d) {
  const time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1)
  const date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate()
  return { time: time, date: date }
}

// ---- 收集文件 ----
if (!fs.existsSync(sourceDir)) {
  console.error('找不到 uni_modules/ 目录，无法打包')
  process.exit(1)
}

const files = []
function walk(dir, base) {
  fs.readdirSync(dir).sort().forEach(function (name) {
    if (name.charAt(0) === '.') return
    const abs = path.join(dir, name)
    const rel = base ? base + '/' + name : name
    if (fs.statSync(abs).isDirectory()) walk(abs, rel)
    else files.push({ name: 'uni_modules/' + rel, abs: abs })
  })
}
walk(sourceDir, '')

if (!files.length) {
  console.error('uni_modules/ 里没有文件')
  process.exit(1)
}

// ---- 生成 ZIP ----
const now = dosTime(new Date())
const chunks = []
const central = []
let offset = 0
let cdSize = 0

files.forEach(function (file) {
  const data = fs.readFileSync(file.abs)
  const nameBuf = Buffer.from(file.name, 'utf8')
  const crc = crc32(data)
  const size = data.length

  const local = Buffer.alloc(30)
  local.writeUInt32LE(0x04034b50, 0)
  local.writeUInt16LE(20, 4)          // version needed
  local.writeUInt16LE(0x0800, 6)      // UTF-8 文件名
  local.writeUInt16LE(0, 8)           // store（不压缩）
  local.writeUInt16LE(now.time, 10)
  local.writeUInt16LE(now.date, 12)
  local.writeUInt32LE(crc, 14)
  local.writeUInt32LE(size, 18)
  local.writeUInt32LE(size, 22)
  local.writeUInt16LE(nameBuf.length, 26)
  local.writeUInt16LE(0, 28)

  const dir = Buffer.alloc(46)
  dir.writeUInt32LE(0x02014b50, 0)
  dir.writeUInt16LE(20, 4)
  dir.writeUInt16LE(20, 6)
  dir.writeUInt16LE(0x0800, 8)
  dir.writeUInt16LE(0, 10)
  dir.writeUInt16LE(now.time, 12)
  dir.writeUInt16LE(now.date, 14)
  dir.writeUInt32LE(crc, 16)
  dir.writeUInt32LE(size, 20)
  dir.writeUInt32LE(size, 24)
  dir.writeUInt16LE(nameBuf.length, 28)
  dir.writeUInt16LE(0, 30)
  dir.writeUInt16LE(0, 32)
  dir.writeUInt16LE(0, 34)
  dir.writeUInt16LE(0, 36)
  dir.writeUInt32LE(0, 38)
  dir.writeUInt32LE(offset, 42)

  chunks.push(local, nameBuf, data)
  central.push(dir, nameBuf)
  offset += local.length + nameBuf.length + data.length
  cdSize += dir.length + nameBuf.length
})

const eocd = Buffer.alloc(22)
eocd.writeUInt32LE(0x06054b50, 0)
eocd.writeUInt16LE(0, 4)
eocd.writeUInt16LE(0, 6)
eocd.writeUInt16LE(files.length, 8)
eocd.writeUInt16LE(files.length, 10)
eocd.writeUInt32LE(cdSize, 12)
eocd.writeUInt32LE(offset, 16)
eocd.writeUInt16LE(0, 20)

fs.writeFileSync(outFile, Buffer.concat(chunks.concat(central, [eocd])))
console.log('已生成 uni-kit-ui-uni_modules.zip：' + files.length + ' 个文件，' +
  (fs.statSync(outFile).size / 1024).toFixed(1) + ' KB')
console.log('解压到目标项目根目录即可（包内顶层目录为 uni_modules/）')
