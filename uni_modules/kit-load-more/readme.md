# kit-load-more 加载更多

列表底部状态提示：加载中 / 更多 / 没有更多 / 失败重试。

> 零依赖、单文件自包含。复制 `uni_modules/kit-load-more/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-load-more status="loading" @click="load" />
```

**API 速记**：四种文案均可通过 props 覆盖；fail 时点击触发 click。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `status` | String | 'more' |
| `loadingText` | String | '加载中...' |
| `moreText` | String | '上拉加载更多' |
| `noMoreText` | String | '没有更多了' |
| `failText` | String | '加载失败，点击重试' |
| `color` | String | '#909399' |
| `textColor` | String | '#909399' |
| `customStyle` | [String, Object, Array] | '' |

## Events

| 事件 | 说明 |
| --- | --- |
| `click` | 组件内 `$emit` 抛出，用 `@click` 监听 |

## Slots

无
