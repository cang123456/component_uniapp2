# kit-badge 徽标

角标 / 小红点，用默认插槽包裹任意内容。

> 零依赖、单文件自包含。复制 `uni_modules/kit-badge/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-badge :value="8"><kit-avatar text="我" /></kit-badge>
```

**API 速记**：dot 切小红点；max 超过显示 N+；showZero 控制 0 是否显示。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `value` | [String, Number] | '' |
| `dot` | Boolean | false |
| `max` | Number | 99 |
| `color` | String | '#fa3534' |
| `showZero` | Boolean | false |
| `customStyle` | [String, Object, Array] | '' |

## Events

无（纯展示组件）

## Slots

| 插槽 | 说明 |
| --- | --- |
| `default` | 默认内容区 |
