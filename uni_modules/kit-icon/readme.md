# kit-icon 图标

通用文本符号图标，零字体文件 / 零图片依赖。

> 零依赖、单文件自包含。复制 `uni_modules/kit-icon/` 到目标项目根目录即可；
> 完整接入方式与多端约定见库根目录 `README.md`。

## 用法

```vue
<kit-icon name="success" color="#18b566" size="40rpx" />
```

**API 速记**：name 可传内置名或直接传字符；支持 20+ 常用符号。

## Props

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| `name` | String | 'success' |
| `size` | String | '36rpx' |
| `color` | String | '#303133' |
| `customStyle` | [String, Object, Array] | '' |

## Events

| 事件 | 说明 |
| --- | --- |
| `click` | 组件内 `$emit` 抛出，用 `@click` 监听 |

## Slots

无
