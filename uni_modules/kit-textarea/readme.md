# kit-textarea 多行输入框

带字数统计的多行输入框，双兼容 v-model。

> 零依赖、单文件自包含。复制 `uni_modules/kit-textarea/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-textarea v-model="content" :maxlength="200" />
```

**API 速记**：showCount 控制字数统计，autoHeight 自适应高度。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `value` | String | '' |
| `modelValue` | String | undefined |
| `placeholder` | String | '' |
| `maxlength` | Number | -1 |
| `height` | String | '180rpx' |
| `autoHeight` | Boolean | false |
| `showCount` | Boolean | true |
| `disabled` | Boolean | false |
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

## Slots

无
