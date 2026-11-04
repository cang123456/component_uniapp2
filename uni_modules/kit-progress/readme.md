# kit-progress 进度条

百分比自动夹取的进度条，支持圆角、文案、呼吸动画。

> 零依赖、单文件自包含。复制 `uni_modules/kit-progress/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-progress :percentage="65" active />
```

**API 速记**：percentage 0-100；color/bgColor/strokeWidth/showText/active。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `percentage` | [Number, String] | 0 |
| `color` | String | '#2979ff' |
| `bgColor` | String | '#ebedf0' |
| `textColor` | String | '' |
| `strokeWidth` | String | '12rpx' |
| `showText` | Boolean | true |
| `round` | Boolean | true |
| `active` | Boolean | false |
| `customStyle` | [String, Object, Array] | '' |

## Events

无（纯展示组件）

## Slots

无
