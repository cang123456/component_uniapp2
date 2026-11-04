<template>
	<view class="kit-progress" :style="customStyle">
		<view class="kit-progress__track" :class="{ 'is-round': round }" :style="{ height: strokeWidth, backgroundColor: bgColor }">
			<view class="kit-progress__bar" :class="{ 'is-round': round, 'is-active': active }"
				:style="{ width: percent + '%', height: strokeWidth, backgroundColor: color }"></view>
		</view>
		<text v-if="showText" class="kit-progress__text" :style="{ color: textColor || color }">{{ percent }}%</text>
	</view>
</template>

<script>
	/** kit-progress 进度条，percentage 自动夹在 0-100 */
	export default {
		name: 'kit-progress',
		props: {
			percentage: { type: [Number, String], default: 0 },
			color: { type: String, default: '#2979ff' },
			bgColor: { type: String, default: '#ebedf0' },
			textColor: { type: String, default: '' },
			strokeWidth: { type: String, default: '12rpx' },
			showText: { type: Boolean, default: true },
			round: { type: Boolean, default: true },
			active: { type: Boolean, default: false },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		computed: {
			percent() {
				const n = Number(this.percentage) || 0
				return Math.max(0, Math.min(100, Math.round(n)))
			}
		}
	}
</script>

<style scoped>
	.kit-progress {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.kit-progress__track {
		flex: 1;
		overflow: hidden;
	}

	.kit-progress__bar {
		transition: width 0.3s ease;
	}

	.is-round { border-radius: 999rpx; }
	.is-active { animation: kit-progress-pulse 1.6s ease-in-out infinite; }

	.kit-progress__text {
		margin-left: 16rpx;
		font-size: 24rpx;
		white-space: nowrap;
	}

	@keyframes kit-progress-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.65; }
	}
</style>
