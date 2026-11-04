# kit-notice-bar 通知栏

纯 CSS 滚动文字通知栏，支持关闭 / 跳转 / 四种语义色。

> 零依赖、单文件自包含。复制 `uni_modules/kit-notice-bar/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-notice-bar text="系统维护通知" type="warning" closeable />
```

**API 速记**：scrollable/speed 控制滚动；closeable/showLink 控制右侧操作。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `text` | String | '' |
| `type` | String | 'warning' |
| `scrollable` | Boolean | true |
| `speed` | Number | 10 |
| `closeable` | Boolean | false |
| `showLink` | Boolean | false |
| `customStyle` | [String, Object, Array] | '' |

## Events

| 事件 | 说明 |
| --- | --- |
| `close` | 组件内 `$emit` 抛出，用 `@close` 监听 |
| `link` | 组件内 `$emit` 抛出，用 `@link` 监听 |

## Slots

| 插槽 | 说明 |
| --- | --- |
| `right` | 具名插槽 |
