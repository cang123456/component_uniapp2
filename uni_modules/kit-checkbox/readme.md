# kit-checkbox 多选组

基于 options 数组的多选组，值为数组，支持 max 上限。

> 零依赖、单文件自包含。复制 `uni_modules/kit-checkbox/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-checkbox v-model="checked" :options="opts" :max="3" />
```

**API 速记**：change 返回选中值数组；超限时触发 overlimit。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `value` | Array | function () { return [] } |
| `modelValue` | Array | undefined |
| `options` | Array | function () { return [] } |
| `inline` | Boolean | false |
| `activeColor` | String | '#2979ff' |
| `max` | Number | 0 |
| `disabled` | Boolean | false |
| `customStyle` | [String, Object, Array] | '' |

## Events

| 事件 | 说明 |
| --- | --- |
| `input` | 组件内 `$emit` 抛出，用 `@input` 监听 |
| `change` | 组件内 `$emit` 抛出，用 `@change` 监听 |
| `update:modelValue` | 组件内 `$emit` 抛出，用 `@update:modelValue` 监听 |
| `update:value` | 组件内 `$emit` 抛出，用 `@update:value` 监听 |
| `overlimit` | 组件内 `$emit` 抛出，用 `@overlimit` 监听 |

## Slots

无
