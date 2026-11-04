# 更新日志

## 1.1.0

- 组件从 5 个扩充到 **28 个**：新增表单 8、反馈 6、展示 4、导航与状态 5。
- 新增 `scripts/gen-meta.js`：从组件清单与 `.vue` 源码自动生成 `package.json` 与 `readme.md`（`npm run meta`）。
- `index.js` 补齐 28 个组件导出；`npm run verify` 全量覆盖。
- 演示页改为按 5 大分类切换的组件画廊；`preview.html` 列出完整组件清单。
- README 补充 28 个组件总表、Vue2/Vue3 双兼容 v-model 约定、新增组件 4 步流程。

## 1.0.0

- 建立 uni_modules 组件库骨架，统一 `kit-` 前缀与 easycom 自动引入规范。
- 新增 5 个零依赖组件：`kit-button`、`kit-tag`、`kit-card`、`kit-empty`、`kit-dialog`。
- 新增可直接运行的组件演示页 `pages/index/index.vue`。
- 新增聚合出口 `index.js` 与 npm 包描述 `package.json`。
- 新增零依赖自检脚本 `scripts/verify.js`（`npm run verify`）。
