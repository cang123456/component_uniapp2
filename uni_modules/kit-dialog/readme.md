# kit-dialog 对话框

零依赖、单文件自包含，**受控组件**：组件自身不保存显隐状态，由父组件的 `show` 决定。

```vue
<kit-dialog v-model:show="visible" title="提示" content="确定要删除这条记录吗？"
  @confirm="onConfirm" @cancel="onCancel" />
```

Vue2 或需要兼容双版本时，用显式监听（`v-model:show` 是 Vue3 语法）：

```vue
<kit-dialog :show="visible" @update:show="visible = $event" @confirm="onConfirm" />
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| show | Boolean | `false` | 是否显示（必填） |
| title | String | `提示` | 标题，传空字符串隐藏 |
| content | String | `''` | 正文，缺省插槽时的文案 |
| confirmText | String | `确定` | 确认按钮文字 |
| cancelText | String | `取消` | 取消按钮文字 |
| showCancel | Boolean | `true` | 是否显示取消按钮 |
| maskClosable | Boolean | `true` | 点击遮罩是否关闭 |
| confirmColor | String | `#2979ff` | 确认按钮文字颜色 |

## Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:show | `false` | 需要关闭时触发，配合 `v-model:show` / `@update:show` 使用 |
| confirm | — | 点击确认 |
| cancel | — | 点击取消 |
| close | — | 点击遮罩或取消时触发 |

## Slots

| 插槽 | 说明 |
| --- | --- |
| default | 自定义正文内容，覆盖 `content` |
| footer | 自定义整个底部按钮区 |
