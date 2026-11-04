# kit-steps 步骤条

横向 / 竖向步骤条，steps 数组驱动。

> 零依赖、单文件自包含。复制 `uni_modules/kit-steps/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-steps :steps="steps" :active="1" direction="horizontal" />
```

**API 速记**：steps 支持字符串或 {title,desc}；active 为当前步骤索引。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `steps` | Array | function () { return [] } |
| `active` | Number | 0 |
| `direction` | String | 'vertical' |
| `activeColor` | String | '#2979ff' |
| `customStyle` | [String, Object, Array] | '' |

## Events

无（纯展示组件）

## Slots

无
