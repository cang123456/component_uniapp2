# kit-avatar 头像

图片 / 文字头像，图片由调用方传入，组件不携带资源。

> 零依赖、单文件自包含。复制 `uni_modules/kit-avatar/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-avatar text="张三" shape="square" />
```

**API 速记**：src/text/size/shape/bgColor/color；default 插槽可完全自定义。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `src` | String | '' |
| `text` | String | '' |
| `size` | String | '80rpx' |
| `shape` | String | 'circle' |
| `bgColor` | String | '#eaf2ff' |
| `color` | String | '#2979ff' |
| `textSize` | String | '28rpx' |
| `mode` | String | 'aspectFill' |
| `customStyle` | [String, Object, Array] | '' |

## Events

| 事件 | 说明 |
| --- | --- |
| `click` | 组件内 `$emit` 抛出，用 `@click` 监听 |

## Slots

| 插槽 | 说明 |
| --- | --- |
| `default` | 默认内容区 |
