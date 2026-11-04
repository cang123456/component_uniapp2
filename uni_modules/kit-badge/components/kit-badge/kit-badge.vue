<template>
	<view class="kit-badge" :style="customStyle">
		<slot></slot>
		<text v-if="dot" class="kit-badge__dot" :style="{ backgroundColor: color }"></text>
		<text v-else-if="showValue" class="kit-badge__value" :style="{ backgroundColor: color }">{{ displayValue }}</text>
	</view>
</template>

<script>
	/** kit-badge 徽标，用默认插槽包裹任意内容 */
	export default {
		name: 'kit-badge',
		props: {
			value: { type: [String, Number], default: '' },
			dot: { type: Boolean, default: false },
			max: { type: Number, default: 99 },
			color: { type: String, default: '#fa3534' },
			showZero: { type: Boolean, default: false },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		computed: {
			showValue() {
				if (this.dot) return false
				const v = this.value
				if (v === '' || v === null || v === undefined) return false
				if (!this.showZero && Number(v) === 0) return false
				return true
			},
			displayValue() {
				const n = Number(this.value)
				if (!isNaN(n) && n > this.max) return this.max + '+'
				return String(this.value)
			}
		}
	}
</script>

<style scoped>
	.kit-badge {
		position: relative;
		display: inline-flex;
		flex-direction: row;
		align-items: center;
	}

	.kit-badge__dot {
		position: absolute;
		top: 0;
		right: 0;
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		transform: translate(50%, -50%);
	}

	.kit-badge__value {
		position: absolute;
		top: 0;
		right: 0;
		box-sizing: border-box;
		min-width: 32rpx;
		height: 32rpx;
		padding: 0 8rpx;
		font-size: 20rpx;
		line-height: 32rpx;
		color: #ffffff;
		text-align: center;
		border-radius: 999rpx;
		transform: translate(50%, -50%);
	}
</style>
