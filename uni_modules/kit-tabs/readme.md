# kit-tabs 标签页

标签头组件（内容由页面根据 change 自己切换），双兼容 v-model。

> 零依赖、单文件自包含。复制 `uni_modules/kit-tabs/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-tabs v-model="active" :tabs="['全部','待付款']" />
```

**API 速记**：绑定选中索引；color/lineColor；change 返回索引。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `value` | Number | 0 |
| `modelValue` | Number | undefined |
| `tabs` | Array | function () { return [] } |
| `color` | String | '#2979ff' |
| `lineColor` | String | '#2979ff' |
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
