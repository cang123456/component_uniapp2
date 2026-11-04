# uni-kit-ui

一套可以直接搬走的 uni-app 组件集合。目标只有一个：**别的项目想用的时候，把目录复制过去就能在模板里写标签，不用装依赖、不用 import、不用注册。**

当前包含 **28 个零依赖组件**，分 5 类：基础 4、表单 8、反馈 7、展示 4、导航/状态 5。
统一 `kit-` 前缀，全部单文件自包含，兼容 Vue2 / Vue3 与 H5 / 小程序 / App。

`pages/index/index.vue` 是可运行的组件演示页（用 `kit-tabs` 分类切换），仅用于本地预览，**不是**组件库的一部分。

---

## 一、为什么用 uni_modules

| 复用方式 | 其他项目里要做什么 | 适合场景 |
| --- | --- | --- |
| 单个 `.vue` 文件 | 复制到 `components/`，页面里 `import` + `components` 注册（或按 easycom 规范放目录） | 只借一两个组件、想完全掌控源码 |
| **uni_modules（推荐）** | 复制 `uni_modules/` 目录到项目根目录，直接写 `<kit-button>` | 组件库分发，H5 / 小程序 / App 全端通用 |
| npm 包 | `npm i`，再配 easycom 或显式 import | 需要版本管理、多人协作、CI |

`uni_modules` 是 DCloud 官方的插件/组件规范。编译器会按
`uni_modules/组件ID/components/组件名/组件名.vue` 自动扫描（easycom），
所以**模板里的 `<kit-button>` 会被自动解析成对应组件，一行配置都不用写**。
同时它也保留了「单个 .vue 拿走就能用」的能力，因为每个组件都是自包含的。

---

## 二、目录结构

```
component_uniapp2/
├─ uni_modules/                       ← 真正要分发的东西，整个拷走即可
│  ├─ kit-button/                     ← 共 28 个组件目录，结构完全一致
│  │  ├─ components/
│  │  │  └─ kit-button/
│  │  │     └─ kit-button.vue        ← 组件本体（单文件自包含）
│  │  ├─ package.json                ← 组件 ID + easycom 映射 + 插件市场元数据
│  │  └─ readme.md                   ← 该组件的 API 文档（从源码自动生成）
│  └─ ...
├─ pages/index/index.vue              ← 演示页，仅本地预览用
├─ pages.json                         ← 演示项目的 easycom 兜底配置
├─ index.js                           ← 28 个组件的聚合出口（显式 import / npm 用）
├─ package.json                       ← npm 包描述 + 三个脚本
├─ preview.html                       ← 静态外观速览（双击即可看，不参与分发）
├─ scripts/
│  ├─ gen-meta.js                     ← 生成 package.json / readme.md
│  ├─ verify.js                       ← 零依赖自检
│  └─ pack.js                         ← 零依赖打包
└─ uni-kit-ui-uni_modules.zip         ← 打包产物，解压到目标项目根目录即可
```

---

## 三、在其他项目里使用

### 方式一：复制 uni_modules（推荐，零配置）

1. 把本项目的 `uni_modules/` 整个目录复制到目标 uni-app 项目**根目录**（和 `pages.json` 同级）。
2. 在任意页面/组件模板里直接写标签：

```vue
<template>
  <view>
    <kit-input v-model="name" placeholder="姓名" clearable />
    <kit-switch v-model="enabled" />
    <kit-button type="primary" @click="save">保存</kit-button>
  </view>
</template>
```

3. 重新编译（HBuilderX 里建议「重新运行」，编译器会重建 easycom 索引）。

> 若自动扫描没生效（某些 CLI 老项目 / 自定义目录），在目标项目的 `pages.json` 里加一条兜底规则，本项目演示页已经这么做了：
>
> ```json
> "easycom": {
>   "autoscan": true,
>   "custom": {
>     "^kit-(.*)$": "@/uni_modules/kit-$1/components/kit-$1/kit-$1.vue"
>   }
> }
> ```
>
> 这条通配规则会覆盖所有 28 个组件，新增组件也不用改。若只拷了某一个组件，就写单条精确映射，
> 例如 `"^kit-button$": "@/uni_modules/kit-button/components/kit-button/kit-button.vue"`。

### 方式二：只拷单个 .vue（最像普通 Vue 组件）

把 `uni_modules/kit-button/components/kit-button/kit-button.vue` 复制到目标项目的
`components/kit-button/kit-button.vue`——这个路径同样符合 easycom 的默认扫描规则，可以直接写 `<kit-button>`。
若想完全显式：

```js
import KitButton from '@/components/kit-button/kit-button.vue'
export default { components: { KitButton } }
```

组件内没有任何相对路径 import、不引用静态资源，所以单独拿走一定能跑。

### 方式三：npm 包（可选，适合版本管理）

```bash
npm i ../component_uniapp2      # 本地依赖（不发布时）
# 或 npm i uni-kit-ui           # 发布后
```

`index.js` 提供 28 个组件的聚合导出，可在 H5 / App 端全局注册：

```js
import { createSSRApp } from 'vue'
import App from './App'
import KitUI from 'uni-kit-ui'
export function createApp() {
  const app = createSSRApp(App)
  app.use(KitUI)
  return { app }
}
```

**小程序端不支持 Vue 全局注册**，请用 easycom：在 `pages.json` 里把映射指到包内路径，
或直接把 `node_modules/uni-kit-ui/uni_modules` 拷到项目根目录按方式一使用。
发布前记得把 `package.json` 的 `name` 改成未被占用的包名。

---

## 四、28 个组件总览

### 基础（4）

| 组件 | 主要能力 | 主要事件 |
| --- | --- | --- |
| `kit-button` | 6 主题 / 4 尺寸 / 镂空 / 圆角 / 块级 / 加载 / 禁用 | `click` |
| `kit-tag` | 6 主题 / 3 尺寸 / 镂空 / 圆角 / 可关闭 | `click`, `close` |
| `kit-card` | 标题 / 额外信息 / 4 个插槽 / 阴影描边 | `click` |
| `kit-empty` | 纯 CSS 插图 / 主副文案 / 操作区 | — |

### 表单（8）

| 组件 | 主要能力 | 主要事件 |
| --- | --- | --- |
| `kit-input` | 单行输入 / 密码 / 可清空 / 错误态 / 前后插槽 | `input`, `change`, `focus`, `blur`, `confirm`, `clear` |
| `kit-textarea` | 多行输入 / 字数统计 / 自适应高度 | `input`, `change` |
| `kit-search` | 纯 CSS 放大镜 / 清除 / 右侧搜索按钮 | `search`, `clear`, `action` |
| `kit-switch` | 纯 CSS 滑动开关 / 自定义颜色 / 两种尺寸 | `change` |
| `kit-stepper` | 加减 / 上下限 / 步长 / 手动输入 | `change`, `minus`, `plus` |
| `kit-rate` | 星标评分 / 自定义数量与颜色 / 只读 | `change` |
| `kit-radio` | options 驱动的单选组 / 横向纵向 | `change` |
| `kit-checkbox` | options 驱动的多选组 / max 上限 | `change`, `overlimit` |

### 反馈（7）

| 组件 | 主要能力 | 主要事件 |
| --- | --- | --- |
| `kit-dialog` | 模态确认框 / 遮罩关闭 / 自定义底部 | `confirm`, `cancel`, `close` |
| `kit-toast` | 自动关闭的轻提示 / 4 种状态 / 3 种位置 | `close` |
| `kit-loading` | 转圈 / 跳点两种纯 CSS 动画 | — |
| `kit-popup` | 上/下/左/右/中五向弹出层，内容全插槽 | `close` |
| `kit-action-sheet` | 底部动作面板 / 副标题 / 禁用项 | `select`, `cancel` |
| `kit-notice-bar` | 滚动通知 / 4 种语义色 / 关闭或跳转 | `close`, `link` |
| `kit-progress` | 百分比自动夹取 / 圆角 / 呼吸动画 | — |

### 展示（4）

| 组件 | 主要能力 |
| --- | --- |
| `kit-badge` | 数字角标 / 小红点 / max 溢出显示 N+ |
| `kit-icon` | 20+ 常用符号图标，零字体文件 / 零图片 |
| `kit-avatar` | 图片或文字头像 / 圆形方形 / 自定义配色 |
| `kit-divider` | 带文字或插槽的分割线 / 虚线 |

### 导航与状态（5）

| 组件 | 主要能力 | 主要事件 |
| --- | --- | --- |
| `kit-cell` | 列表单元格 / 图标、描述、右侧值、箭头 / 4 个插槽 | `click` |
| `kit-tabs` | 标签头（内容由页面按 `change` 自己切换） | `change` |
| `kit-steps` | 横向 / 竖向步骤条 | — |
| `kit-load-more` | 加载中 / 更多 / 没有更多 / 失败重试 | `click` |
| `kit-skeleton` | 骨架屏，`loading=false` 时自动显示真实内容 | — |

完整 props / events / slots 表见各组件目录下的 `readme.md`（由 `scripts/gen-meta.js` 从源码生成，和代码同步）。

### 两个关键约定

**① 显隐受控**：所有弹层（dialog / toast / popup / action-sheet）不保存内部状态：

```vue
<!-- Vue3 简写 -->
<kit-dialog v-model:show="visible" @confirm="ok" />

<!-- Vue2 与 Vue3 通吃 -->
<kit-dialog :show="visible" @update:show="visible = $event" @confirm="ok" />
```

**② v-model 双兼容**：Vue2 的 `v-model` 走 `value` + `input`，Vue3 走 `modelValue` + `update:modelValue`。
所有值类组件（input / textarea / search / switch / stepper / rate / radio / checkbox / tabs）
同时实现两套，内部取 `modelValue ?? value`，变化时同时抛出 `input`、`update:modelValue`、`update:value`、`change`。
因此下面三种写法都能用：

```vue
<kit-input v-model="name" />                              <!-- Vue2 / Vue3 都行 -->
<kit-input :value="name" @input="name = $event" />        <!-- 显式，最保守 -->
<kit-input v-model:value="name" />                        <!-- Vue3 -->
```

---

## 五、多端兼容约定（新增组件时也请遵守）

这些约束是「拷到别的项目不会出问题」的关键：

- **单文件自包含**：不 import 其他 js/vue、不依赖 `uni.scss` 变量、不引用图片/字体文件
  （`kit-icon` 用文本符号、`kit-empty` 用纯 CSS 画插图、`kit-avatar` 的图片由调用方传入）。
- **纯 CSS + `<style scoped>`**：宿主项目可能没装 sass/less 编译器；H5 端不写 scoped 会污染全局样式。
- **只用 rpx / px / 常规属性**：避免 `gap`、`inset`、CSS 变量、`currentColor`、结构伪类等小程序内核支持不一致的特性。
- **不用浏览器 API、不用第三方库、不用 `v-html`、不用 `$refs` 操作 DOM**。
- **事件统一 `$emit`**，并显式声明 `emits`（Vue3 需要，Vue2 会忽略该字段）；自检脚本会核对。
- **定时器要清理**：`kit-toast` 在 `beforeDestroy` / `beforeUnmount` 里都清了 timer。
- **分组组件用 options 数组**（`kit-radio` / `kit-checkbox` / `kit-tabs` / `kit-steps` / `kit-action-sheet`），
  不用 `$parent` / provide-inject，规避小程序端跨组件通信差异。
- 命名插槽优先用 `v-slot:name`；个别小程序编译异常时改用兼容写法 `<view slot="footer">`。
- 组件前缀统一 `kit-`，避免和宿主项目已有组件重名。

设计目标：H5、微信小程序、App，以及 Vue2 / Vue3 的 Options API 写法。
本项目只做了静态自检（结构、JSON、JS 语法、标签配对），**没有替你做真机/多端编译**，
接入目标项目后建议先运行到 H5 和对应小程序端各看一眼。

---

## 六、新增一个组件（4 步）

1. 建目录并写组件：`uni_modules/kit-xxx/components/kit-xxx/kit-xxx.vue`（**三层同名**，easycom 靠这个识别）。
   遵守上一节约定：`name: 'kit-xxx'`、`emits`、`props` 写成规整的对象形式、`<style scoped>`、零外部依赖。
2. 在 `scripts/gen-meta.js` 顶部的 `C` 清单里加一行：
   `[id, 中文名, 描述, 关键词, 分类, 用法示例, API 速记]`。
3. 跑 `npm run meta` → 自动生成 `package.json`（含 easycom 映射）和 `readme.md`（props / events / slots 直接从源码提取）。
   默认只补缺失文件，不会覆盖已手工精修的文档；想全量重建加 `--force`。
4. 在根 `index.js` 补上导出（仅 npm / 显式 import 需要），跑 `npm run verify`，再 `npm run zip` 重新打包。

`pages.json` 里的通配规则 `^kit-(.*)$` 会自动覆盖新组件，不用改。

---

## 七、三个零依赖脚本

| 命令 | 脚本 | 作用 |
| --- | --- | --- |
| `npm run meta` | `scripts/gen-meta.js` | 从组件清单 + `.vue` 源码生成 `package.json` / `readme.md` |
| `npm run verify` | `scripts/verify.js` | 全量自检，失败返回非 0 退出码，可放进 CI |
| `npm run zip` | `scripts/pack.js` | 重新生成 `uni-kit-ui-uni_modules.zip` |

`verify` 会检查：easycom 三层目录规范、`package.json` 合法性与 id 一致性、easycom 映射目标是否存在、
组件是否误用外部 import / scss / 未加 scoped、`name` 与目录一致、`emits` 是否覆盖所有 `$emit`、
`<script>` 块 JS 语法、模板标签配对、`index.js` 是否导出全部组件、`pages.json` 是否可解析。

`pack` 用标准正斜杠路径写 ZIP（Windows 自带压缩的包内是反斜杠，在 macOS / Linux 上解压会得到一串乱码文件名）。

---

## 八、分发 / 发布（按需，自己执行）

- **给同事 / 自己其他项目**：把 `uni-kit-ui-uni_modules.zip` 发过去，解压到项目根目录即可（或直接复制 `uni_modules/` 目录）。
- **DCloud 插件市场**：HBuilderX 里右键某个 `uni_modules/kit-xxx` 目录 → 上传插件（`package.json` 里的 `dcloudext` 已经写好）。
- **npm**：改好 `package.json` 的 `name` / `version` / `repository`，`npm publish`。`files` 字段已限定只发包内组件与文档。

---

## 常见问题

**标签不生效、报 unknown custom element** → 确认 `uni_modules` 在根目录、组件是三层同名目录、重新编译；再检查 `pages.json` 的 easycom 规则。

**样式不生效或串到别的页面** → 组件必须 `<style scoped>`；H5 端清一下编译缓存。

**小程序端 footer 插槽不显示** → 把 `v-slot:footer` 换成 `<view slot="footer">...</view>`。

**Vue2 项目里 `v-model:show` 报错** → 改用 `:show="visible" @update:show="visible = $event"`。

**图标显示成方框** → 该端字体缺这个字形；直接把字符传给 `name`（如 `<kit-icon name="✓" />`），或换一个内置名。

**想换主题色** → 全局搜索 `#2979ff` 替换即可，颜色都写在各自的组件文件里。
