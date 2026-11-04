# kit-cell 单元格

列表项单元格，支持图标、标题、描述、右侧值与箭头。

> 零依赖、单文件自包含。复制 `uni_modules/kit-cell/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-cell title="我的订单" value="3" arrow clickable @click="go" />
```

**API 速记**：icon/label/value/right 插槽；多个 kit-cell 直接 v-for 包一层容器。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `title` | String | '' |
| `label` | String | '' |
| `value` | [String, Number] | '' |
| `icon` | String | '' |
| `iconColor` | String | '#2979ff' |
| `arrow` | Boolean | false |
| `clickable` | Boolean | false |
| `border` | Boolean | true |
| `customStyle` | [String, Object, Array] | '' |

## Events

| 事件 | 说明 |
| --- | --- |
| `click` | 组件内 `$emit` 抛出，用 `@click` 监听 |

## Slots

| 插槽 | 说明 |
| --- | --- |
| `icon` | 具名插槽 |
| `label` | 具名插槽 |
| `value` | 具名插槽 |
| `right` | 具名插槽 |
