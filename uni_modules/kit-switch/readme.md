# kit-switch 开关

纯 CSS 滑动开关，双兼容 v-model（Boolean）。

> 零依赖、单文件自包含。复制 `uni_modules/kit-switch/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-switch v-model="enabled" active-color="#18b566" />
```

**API 速记**：activeColor/inactiveColor/size/disabled；change 返回新布尔值。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `value` | Boolean | false |
| `modelValue` | Boolean | undefined |
| `activeColor` | String | '#2979ff' |
| `inactiveColor` | String | '#e4e7ed' |
| `size` | String | 'normal' |
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
