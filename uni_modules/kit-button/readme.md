# kit-button 按钮

零依赖、单文件自包含。把 `components/kit-button/kit-button.vue` 复制到任意 uni-app 项目即可使用，也可以直接复制整个 `kit-button` 目录到项目根目录的 `uni_modules/` 下由 easycom 自动引入。

```vue
<kit-button type="primary" @click="handleClick">确定</kit-button>
<kit-button type="danger" plain round size="small" text="删除" @click="handleClick" />
<kit-button type="primary" loading block>提交中</kit-button>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | String | `default` | `default / primary / success / warning / danger / info` |
| size | String | `normal` | `mini / small / normal / large` |
| text | String | `''` | 不写插槽时的按钮文字 |
| plain | Boolean | `false` | 镂空样式 |
| round | Boolean | `false` | 胶囊圆角 |
| block | Boolean | `false` | 占满父容器宽度 |
| disabled | Boolean | `false` | 禁用（不触发 click） |
| loading | Boolean | `false` | 加载中（不触发 click） |
| customStyle | String/Object/Array | `''` | 追加自定义样式 |

## Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | 原生事件对象 | 点击且未禁用、未加载时触发 |

## Slots

| 插槽 | 说明 |
| --- | --- |
| default | 按钮内容，缺省时显示 `text` |
| icon | 文字前的前置图标区域 |
