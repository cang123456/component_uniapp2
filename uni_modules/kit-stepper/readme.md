# kit-stepper 步进器

加减数量的步进器，带上下限与手动输入，双兼容 v-model。

> 零依赖、单文件自包含。复制 `uni_modules/kit-stepper/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-stepper v-model="count" :min="1" :max="9" />
```

**API 速记**：min/max/step/integer/editable；超出范围自动夹取。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `value` | Number | 1 |
| `modelValue` | Number | undefined |
| `min` | Number | 0 |
| `max` | Number | 999 |
| `step` | Number | 1 |
| `integer` | Boolean | true |
| `editable` | Boolean | true |
| `disabled` | Boolean | false |
| `customStyle` | [String, Object, Array] | '' |

## Events

| 事件 | 说明 |
| --- | --- |
| `input` | 组件内 `$emit` 抛出，用 `@input` 监听 |
| `change` | 组件内 `$emit` 抛出，用 `@change` 监听 |
| `update:modelValue` | 组件内 `$emit` 抛出，用 `@update:modelValue` 监听 |
| `update:value` | 组件内 `$emit` 抛出，用 `@update:value` 监听 |
| `minus` | 组件内 `$emit` 抛出，用 `@minus` 监听 |
| `plus` | 组件内 `$emit` 抛出，用 `@plus` 监听 |

## Slots

无
