# kit-loading 加载指示器

纯 CSS 转圈 / 跳点加载动画，可带文案。

> 零依赖、单文件自包含。复制 `uni_modules/kit-loading/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-loading text="加载中" type="spinner" />
```

**API 速记**：type: spinner/dots；vertical 控制图文方向。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `type` | String | 'spinner' |
| `size` | String | '48rpx' |
| `color` | String | '#2979ff' |
| `text` | String | '' |
| `textColor` | String | '' |
| `vertical` | Boolean | true |
| `customStyle` | [String, Object, Array] | '' |

## Events

无（纯展示组件）

## Slots

无
