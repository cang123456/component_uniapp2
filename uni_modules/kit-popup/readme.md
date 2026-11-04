# kit-popup 弹出层

五向弹出层（上/下/左/右/中），内容完全由插槽提供。

> 零依赖、单文件自包含。复制 `uni_modules/kit-popup/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-popup v-model:show="visible" position="bottom"><view>内容</view></kit-popup>
```

**API 速记**：受控 show；round/maskClosable/bgColor/width/height。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `show` | Boolean | false |
| `position` | String | 'bottom' |
| `round` | Boolean | true |
| `maskClosable` | Boolean | true |
| `bgColor` | String | '#ffffff' |
| `width` | String | '' |
| `height` | String | '' |

## Events

| 事件 | 说明 |
| --- | --- |
| `update:show` | 组件内 `$emit` 抛出，用 `@update:show` 监听 |
| `close` | 组件内 `$emit` 抛出，用 `@close` 监听 |

## Slots

| 插槽 | 说明 |
| --- | --- |
| `default` | 默认内容区 |
