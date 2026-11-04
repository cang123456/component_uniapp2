# kit-rate 评分

星标评分，字符绘制无字体依赖，双兼容 v-model。

> 零依赖、单文件自包含。复制 `uni_modules/kit-rate/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-rate v-model="score" :count="5" />
```

**API 速记**：count/size/color/voidColor/disabled/readonly；change 返回分值。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `value` | Number | 0 |
| `modelValue` | Number | undefined |
| `count` | Number | 5 |
| `size` | String | '44rpx' |
| `color` | String | '#ff9900' |
| `voidColor` | String | '#dcdfe6' |
| `disabled` | Boolean | false |
| `readonly` | Boolean | false |
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
