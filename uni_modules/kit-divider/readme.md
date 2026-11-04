# kit-divider 分割线

可带文字 / 插槽的分割线，支持虚线。

> 零依赖、单文件自包含。复制 `uni_modules/kit-divider/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-divider text="没有更多了" dashed />
```

**API 速记**：text 或 default 插槽会在中间渲染；color/textColor 可调。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `text` | String | '' |
| `dashed` | Boolean | false |
| `color` | String | '#dcdfe6' |
| `textColor` | String | '#909399' |
| `customStyle` | [String, Object, Array] | '' |

## Events

无（纯展示组件）

## Slots

| 插槽 | 说明 |
| --- | --- |
| `default` | 默认内容区 |
