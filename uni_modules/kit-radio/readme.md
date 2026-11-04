# kit-radio 单选组

基于 options 数组的单选组，避免小程序端跨组件通信问题。

> 零依赖、单文件自包含。复制 `uni_modules/kit-radio/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-radio v-model="picked" :options="['A','B']" inline />
```

**API 速记**：options 支持字符串或 {label,value,disabled}；inline 横向排列。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `value` | [String, Number] | '' |
| `modelValue` | [String, Number] | undefined |
| `options` | Array | function () { return [] } |
| `inline` | Boolean | false |
| `activeColor` | String | '#2979ff' |
| `disabled` | Boolean | false |
| `customStyle` | [String, Object, Array] | '' |

## Events

| 事件 | 说明 |
| --- | --- |
| `input` | 组件内 `$emit` 抛出，用 `@input` 监听 |
| `change` | 组件内 `$emit` 抛出，用 `@change` 监听 |
| `update:modelValue` | 组件内 `$emit` 抛出，用 `@update:modelValue` 监听 |
| `update:value` | 组件内 `$emit` 抛出，用 `@update:value` 监听 |

## Slots

无
