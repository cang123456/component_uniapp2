<template>
	<view class="kit-tag" :class="rootClass" :style="customStyle" @click="onClick">
		<slot>{{ text }}</slot>
		<text v-if="closable" class="kit-tag__close" @click.stop="onClose">×</text>
	</view>
</template>

<script>
	/**
	 * kit-tag 标签
	 * 零依赖、单文件自包含，可直接复制到任意 uni-app 项目使用
	 */
	export default {
		name: 'kit-tag',
		emits: ['click', 'close'],
		props: {
			text: { type: [String, Number], default: '' },
			// default | primary | success | warning | danger | info
			type: { type: String, default: 'default' },
			// small | normal | large
			size: { type: String, default: 'normal' },
			plain: { type: Boolean, default: false },
			round: { type: Boolean, default: false },
			closable: { type: Boolean, default: false },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		computed: {
			rootClass() {
				return [
					'kit-tag--' + this.type,
					'kit-tag--' + this.size,
					this.plain ? 'is-plain' : '',
					this.round ? 'is-round' : ''
				]
			}
		},
		methods: {
			onClick(e) {
				this.$emit('click', e)
			},
			onClose(e) {
				this.$emit('close', e)
			}
		}
	}
</script>

<style scoped>
	.kit-tag {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 6rpx 16rpx;
		font-size: 24rpx;
		line-height: 1.4;
		border: 1px solid transparent;
		border-radius: 6rpx;
	}

	.kit-tag--small { padding: 4rpx 12rpx; font-size: 20rpx; }
	.kit-tag--normal { padding: 6rpx 16rpx; font-size: 24rpx; }
	.kit-tag--large { padding: 8rpx 20rpx; font-size: 28rpx; }

	.kit-tag--default { background-color: #f4f4f5; color: #606266; border-color: #f4f4f5; }
	.kit-tag--primary { background-color: #eaf2ff; color: #2979ff; border-color: #eaf2ff; }
	.kit-tag--success { background-color: #e8f8ef; color: #18b566; border-color: #e8f8ef; }
	.kit-tag--warning { background-color: #fff4e5; color: #f08c00; border-color: #fff4e5; }
	.kit-tag--danger  { background-color: #feeceb; color: #fa3534; border-color: #feeceb; }
	.kit-tag--info    { background-color: #eef0f2; color: #909399; border-color: #eef0f2; }

	.kit-tag--default.is-plain { background-color: transparent; color: #909399; border-color: #dcdfe6; }
	.kit-tag--primary.is-plain { background-color: transparent; color: #2979ff; border-color: #2979ff; }
	.kit-tag--success.is-plain { background-color: transparent; color: #18b566; border-color: #18b566; }
	.kit-tag--warning.is-plain { background-color: transparent; color: #f08c00; border-color: #ff9900; }
	.kit-tag--danger.is-plain  { background-color: transparent; color: #fa3534; border-color: #fa3534; }
	.kit-tag--info.is-plain    { background-color: transparent; color: #909399; border-color: #c0c4cc; }

	.is-round { border-radius: 999rpx; }

	/* 用文本 × 而不是 currentColor 画图标，兼容各小程序内核 */
	.kit-tag__close {
		margin-left: 8rpx;
		font-size: 28rpx;
		line-height: 1;
	}
</style>
