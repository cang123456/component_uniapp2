<template>
	<view class="kit-button" :class="rootClass" :style="customStyle" @click="onClick" @touchstart="onTouchStart"
		@touchend="onTouchEnd" @touchcancel="onTouchEnd">
		<view v-if="loading" class="kit-button__loading" :style="{ borderColor: spinnerColor, borderTopColor: 'transparent' }"></view>
		<slot name="icon"></slot>
		<slot>{{ text }}</slot>
	</view>
</template>

<script>
	/**
	 * kit-button 按钮
	 * 零依赖、单文件自包含，可直接复制到任意 uni-app 项目使用
	 */
	export default {
		name: 'kit-button',
		// Vue3 需要声明 emits，避免 click 被当作原生事件透传；Vue2 会忽略该字段
		emits: ['click'],
		props: {
			// default | primary | success | warning | danger | info
			type: { type: String, default: 'default' },
			// mini | small | normal | large
			size: { type: String, default: 'normal' },
			text: { type: String, default: '' },
			plain: { type: Boolean, default: false },
			round: { type: Boolean, default: false },
			block: { type: Boolean, default: false },
			disabled: { type: Boolean, default: false },
			loading: { type: Boolean, default: false },
			// 外部追加样式，支持字符串 / 对象 / 数组
			customStyle: { type: [String, Object, Array], default: '' }
		},
		data() {
			return { pressed: false }
		},
		computed: {
			// 用内联颜色而非 currentColor，兼容各小程序内核
			spinnerColor() {
				const colors = {
					default: '#606266',
					primary: '#2979ff',
					success: '#18b566',
					warning: '#ff9900',
					danger: '#fa3534',
					info: '#909399'
				}
				if (this.plain || this.type === 'default') return colors[this.type] || colors.default
				return '#ffffff'
			},
			rootClass() {
				return [
					'kit-button--' + this.type,
					'kit-button--' + this.size,
					this.plain ? 'is-plain' : '',
					this.round ? 'is-round' : '',
					this.block ? 'is-block' : '',
					this.disabled ? 'is-disabled' : '',
					this.loading ? 'is-loading' : '',
					this.pressed && !this.disabled && !this.loading ? 'is-pressed' : ''
				]
			}
		},
		methods: {
			onTouchStart() {
				if (!this.disabled && !this.loading) this.pressed = true
			},
			onTouchEnd() {
				this.pressed = false
			},
			onClick(e) {
				if (this.disabled || this.loading) return
				this.$emit('click', e)
			}
		}
	}
</script>

<style scoped>
	.kit-button {
		display: inline-flex;
		vertical-align: middle;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		height: 80rpx;
		padding: 0 32rpx;
		font-size: 28rpx;
		line-height: 1;
		border: 1px solid #dcdfe6;
		border-radius: 8rpx;
		background-color: #ffffff;
		color: #303133;
		transition: opacity 0.15s;
	}

	/* 尺寸 */
	.kit-button--mini { height: 52rpx; padding: 0 20rpx; font-size: 22rpx; }
	.kit-button--small { height: 64rpx; padding: 0 24rpx; font-size: 24rpx; }
	.kit-button--normal { height: 80rpx; padding: 0 32rpx; font-size: 28rpx; }
	.kit-button--large { height: 96rpx; padding: 0 40rpx; font-size: 32rpx; }

	/* 主题色：实心 */
	.kit-button--default { background-color: #ffffff; color: #303133; border-color: #dcdfe6; }
	.kit-button--primary { background-color: #2979ff; color: #ffffff; border-color: #2979ff; }
	.kit-button--success { background-color: #18b566; color: #ffffff; border-color: #18b566; }
	.kit-button--warning { background-color: #ff9900; color: #ffffff; border-color: #ff9900; }
	.kit-button--danger  { background-color: #fa3534; color: #ffffff; border-color: #fa3534; }
	.kit-button--info    { background-color: #909399; color: #ffffff; border-color: #909399; }

	/* 主题色：镂空 */
	.kit-button--default.is-plain { background-color: transparent; color: #303133; border-color: #dcdfe6; }
	.kit-button--primary.is-plain { background-color: transparent; color: #2979ff; border-color: #2979ff; }
	.kit-button--success.is-plain { background-color: transparent; color: #18b566; border-color: #18b566; }
	.kit-button--warning.is-plain { background-color: transparent; color: #ff9900; border-color: #ff9900; }
	.kit-button--danger.is-plain  { background-color: transparent; color: #fa3534; border-color: #fa3534; }
	.kit-button--info.is-plain    { background-color: transparent; color: #909399; border-color: #909399; }

	/* 状态 */
	.is-round { border-radius: 999rpx; }
	.is-block { display: flex; width: 100%; }
	.is-pressed { opacity: 0.75; }
	.is-disabled { opacity: 0.45; }
	.is-loading { opacity: 0.85; }

	.kit-button__loading {
		width: 28rpx;
		height: 28rpx;
		margin-right: 12rpx;
		box-sizing: border-box;
		border-width: 3rpx;
		border-style: solid;
		border-radius: 50%;
		animation: kit-button-spin 0.7s linear infinite;
	}

	@keyframes kit-button-spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
</style>
