# kit-tag 标签

零依赖、单文件自包含。把 `components/kit-tag/kit-tag.vue` 复制到任意 uni-app 项目即可使用，也可以直接复制整个 `kit-tag` 目录到项目根目录的 `uni_modules/` 下由 easycom 自动引入。

```vue
<kit-tag text="默认" />
<kit-tag type="primary" plain round>推荐</kit-tag>
<kit-tag type="danger" closable @close="onClose">可关闭</kit-tag>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| text | String/Number | `''` | 不写插槽时的标签文字 |
| type | String | `default` | `default / primary / success / warning / danger / info` |
| size | String | `normal` | `small / normal / large` |
| plain | Boolean | `false` | 镂空样式 |
| round | Boolean | `false` | 胶囊圆角 |
| closable | Boolean | `false` | 显示关闭按钮 |
| customStyle | String/Object/Array | `''` | 追加自定义样式 |

## Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | 原生事件对象 | 点击标签 |
| close | 原生事件对象 | 点击关闭按钮（不会冒泡触发 click） |

## Slots

| 插槽 | 说明 |
| --- | --- |
| default | 标签内容，缺省时显示 `text` |
