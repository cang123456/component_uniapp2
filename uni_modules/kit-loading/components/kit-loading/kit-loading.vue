<template>
	<view class="kit-loading" :class="{ 'is-vertical': vertical, 'is-inline': !vertical }" :style="customStyle">
		<view v-if="type === 'spinner'" class="kit-loading__spinner" :style="spinnerStyle"></view>
		<view v-else class="kit-loading__dots">
			<view class="kit-loading__dot" v-for="i in 3" :key="i"
				:style="{ backgroundColor: color, animationDelay: (i - 1) * 0.15 + 's' }"></view>
		</view>
		<text v-if="text" class="kit-loading__text" :style="{ color: textColor || color }">{{ text }}</text>
	</view>
</template>

<script>
	/** kit-loading 加载指示器（纯 CSS 动画，无图片 / 无 gif） */
	export default {
		name: 'kit-loading',
		props: {
			type: { type: String, default: 'spinner' },
			size: { type: String, default: '48rpx' },
			color: { type: String, default: '#2979ff' },
			text: { type: String, default: '' },
			textColor: { type: String, default: '' },
			vertical: { type: Boolean, default: true },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		computed: {
			spinnerStyle() {
				return {
					width: this.size,
					height: this.size,
					borderColor: this.color,
					borderTopColor: 'transparent'
				}
			}
		}
	}
</script>

<style scoped>
	.kit-loading {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.is-vertical { flex-direction: column; }

	.kit-loading__spinner {
		box-sizing: border-box;
		border-width: 4rpx;
		border-style: solid;
		border-radius: 50%;
		animation: kit-loading-spin 0.7s linear infinite;
	}

	.kit-loading__dots {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.kit-loading__dot {
		width: 14rpx;
		height: 14rpx;
		margin: 0 5rpx;
		border-radius: 50%;
		animation: kit-loading-bounce 0.8s ease-in-out infinite;
	}

	.kit-loading__text {
		margin-top: 16rpx;
		margin-left: 0;
		font-size: 26rpx;
		line-height: 1.5;
	}

	.is-inline .kit-loading__text { margin-top: 0; margin-left: 12rpx; }

	@keyframes kit-loading-spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	@keyframes kit-loading-bounce {
		0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
		40% { transform: scale(1); opacity: 1; }
	}
</style>
