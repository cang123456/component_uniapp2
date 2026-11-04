# kit-card 卡片

零依赖、单文件自包含。把 `components/kit-card/kit-card.vue` 复制到任意 uni-app 项目即可使用，也可以直接复制整个 `kit-card` 目录到项目根目录的 `uni_modules/` 下由 easycom 自动引入。

```vue
<kit-card title="订单信息" extra="查看更多">
  <view>这里是卡片内容</view>
  <template v-slot:footer>
    <kit-button size="small" type="primary">去支付</kit-button>
  </template>
</kit-card>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | String | `''` | 标题，为空时不渲染头部 |
| extra | String | `''` | 右上角额外文字 |
| padding | String | `24rpx` | 内容区内边距 |
| radius | String | `16rpx` | 圆角 |
| shadow | Boolean | `true` | 阴影 |
| border | Boolean | `false` | 描边 |

## Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | 原生事件对象 | 点击卡片任意位置 |

## Slots

| 插槽 | 说明 |
| --- | --- |
| default | 内容区 |
| header | 自定义整个头部（会覆盖 title / extra） |
| extra | 自定义右上角区域 |
| footer | 底部区域，传入时才渲染 |

> 小程序端若 `v-slot` 编译异常，可改用兼容写法 `<view slot="footer">...</view>`。
