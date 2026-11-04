# kit-input 输入框

带边框、可清空的单行输入框，双兼容 v-model。

> 零依赖、单文件自包含。复制 `uni_modules/kit-input/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-input v-model="name" placeholder="请输入姓名" clearable />
```

**API 速记**：type/password/maxlength/clearable/error；事件 input/change/focus/blur/confirm/clear。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `value` | [String, Number] | '' |
| `modelValue` | [String, Number] | undefined |
| `type` | String | 'text' |
| `placeholder` | String | '' |
| `password` | Boolean | false |
| `disabled` | Boolean | false |
| `clearable` | Boolean | false |
| `error` | Boolean | false |
| `border` | Boolean | true |
| `focus` | Boolean | false |
| `maxlength` | Number | -1 |
| `confirmType` | String | 'done' |
| `customStyle` | [String, Object, Array] | '' |

## Events

| 事件 | 说明 |
| --- | --- |
| `input` | 组件内 `$emit` 抛出，用 `@input` 监听 |
| `change` | 组件内 `$emit` 抛出，用 `@change` 监听 |
| `update:modelValue` | 组件内 `$emit` 抛出，用 `@update:modelValue` 监听 |
| `update:value` | 组件内 `$emit` 抛出，用 `@update:value` 监听 |
| `focus` | 组件内 `$emit` 抛出，用 `@focus` 监听 |
| `blur` | 组件内 `$emit` 抛出，用 `@blur` 监听 |
| `confirm` | 组件内 `$emit` 抛出，用 `@confirm` 监听 |
| `clear` | 组件内 `$emit` 抛出，用 `@clear` 监听 |

## Slots

| 插槽 | 说明 |
| --- | --- |
| `prefix` | 具名插槽 |
| `suffix` | 具名插槽 |
