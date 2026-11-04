# kit-skeleton 骨架屏

骨架占位，loading 为 false 时自动显示插槽里的真实内容。

> 零依赖、单文件自包含。复制 `uni_modules/kit-skeleton/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-skeleton :loading="loading" :rows="3" avatar title>真实内容</kit-skeleton>
```

**API 速记**：rows/avatar/title/animate；可直接包裹页面区域。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `loading` | Boolean | true |
| `rows` | Number | 3 |
| `avatar` | Boolean | false |
| `title` | Boolean | false |
| `avatarSize` | String | '80rpx' |
| `animate` | Boolean | true |
| `customStyle` | [String, Object, Array] | '' |

## Events

无（纯展示组件）

## Slots

| 插槽 | 说明 |
| --- | --- |
| `default` | 默认内容区 |
