# kit-search 搜索框

纯 CSS 放大镜图标的搜索框，双兼容 v-model。

> 零依赖、单文件自包含。复制 `uni_modules/kit-search/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-search v-model="keyword" @search="doSearch" />
```

**API 速记**：showAction 控制右侧按钮；事件 search/clear/action。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `value` | String | '' |
| `modelValue` | String | undefined |
| `placeholder` | String | '请输入关键词' |
| `bgColor` | String | '#f5f6f8' |
| `clearable` | Boolean | true |
| `showAction` | Boolean | true |
| `actionText` | String | '搜索' |
| `disabled` | Boolean | false |
| `customStyle` | [String, Object, Array] | '' |

## Events

| 事件 | 说明 |
| --- | --- |
| `input` | 组件内 `$emit` 抛出，用 `@input` 监听 |
| `change` | 组件内 `$emit` 抛出，用 `@change` 监听 |
| `update:modelValue` | 组件内 `$emit` 抛出，用 `@update:modelValue` 监听 |
| `update:value` | 组件内 `$emit` 抛出，用 `@update:value` 监听 |
| `search` | 组件内 `$emit` 抛出，用 `@search` 监听 |
| `clear` | 组件内 `$emit` 抛出，用 `@clear` 监听 |
| `action` | 组件内 `$emit` 抛出，用 `@action` 监听 |

## Slots

无
