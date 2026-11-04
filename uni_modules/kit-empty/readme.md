# kit-empty 空状态

零依赖、单文件自包含，插图由纯 CSS 绘制，**不含任何图片文件**，拷贝到别的项目不会出现图片丢失。

```vue
<kit-empty />
<kit-empty text="暂无订单" description="下单后可以在这里查看">
  <kit-button size="small" type="primary">去逛逛</kit-button>
</kit-empty>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| text | String | `暂无数据` | 主文案 |
| description | String | `''` | 辅助说明 |
| showIcon | Boolean | `true` | 是否显示插图 |
| customStyle | String/Object/Array | `''` | 追加自定义样式 |

## Slots

| 插槽 | 说明 |
| --- | --- |
| image | 自定义插图（例如换成项目自己的图片） |
| default | 底部操作区，例如放一个按钮 |
