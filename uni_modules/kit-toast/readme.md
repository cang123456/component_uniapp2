# kit-toast 轻提示

受控显隐的轻提示，自动关闭，支持四种状态与三种位置。

> 零依赖、单文件自包含。复制 `uni_modules/kit-toast/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-toast v-model:show="visible" message="保存成功" type="success" />
```

**API 速记**：duration 毫秒，传 0 表示由页面控制关闭；position: center/top/bottom。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `show` | Boolean | false |
| `message` | String | '' |
| `type` | String | 'none' |
| `position` | String | 'center' |
| `duration` | Number | 2000 |

## Events

| 事件 | 说明 |
| --- | --- |
| `update:show` | 组件内 `$emit` 抛出，用 `@update:show` 监听 |
| `close` | 组件内 `$emit` 抛出，用 `@close` 监听 |

## Slots

无
