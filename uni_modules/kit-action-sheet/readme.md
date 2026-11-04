# kit-action-sheet 动作面板

底部动作面板，基于 actions 数组，点击自动关闭。

> 零依赖、单文件自包含。复制 `uni_modules/kit-action-sheet/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-action-sheet v-model:show="visible" :actions="actions" @select="onSelect" />
```

**API 速记**：select 返回 (index, action)；cancel/close/update:show。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `show` | Boolean | false |
| `actions` | Array | function () { return [] } |
| `title` | String | '' |
| `cancelText` | String | '取消' |
| `maskClosable` | Boolean | true |

## Events

| 事件 | 说明 |
| --- | --- |
| `select` | 组件内 `$emit` 抛出，用 `@select` 监听 |
| `cancel` | 组件内 `$emit` 抛出，用 `@cancel` 监听 |
| `close` | 组件内 `$emit` 抛出，用 `@close` 监听 |
| `update:show` | 组件内 `$emit` 抛出，用 `@update:show` 监听 |

## Slots

无
