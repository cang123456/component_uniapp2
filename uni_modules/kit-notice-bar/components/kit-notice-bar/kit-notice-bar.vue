<template>
	<view class="kit-notice-bar" :class="'kit-notice-bar--' + type" :style="customStyle">
		<text class="kit-notice-bar__icon">{{ type === 'success' ? '✓' : (type === 'danger' ? '✕' : (type === 'warning' ? '!' : 'i')) }}</text>
		<view class="kit-notice-bar__wrap">
			<text class="kit-notice-bar__text" :class="{ 'is-scroll': scrollable }" :style="scrollStyle">{{ text }}</text>
		</view>
		<slot name="right"></slot>
		<text v-if="closeable" class="kit-notice-bar__close" @click.stop="onClose">×</text>
		<text v-else-if="showLink" class="kit-notice-bar__link" @click.stop="onLink">›</text>
	</view>
</template>

<script>
	/** kit-notice-bar 通知栏（滚动文字为纯 CSS 动画） */
	export default {
		name: 'kit-notice-bar',
		emits: ['close', 'link'],
		props: {
			text: { type: String, default: '' },
			type: { type: String, default: 'warning' },
			scrollable: { type: Boolean, default: true },
			speed: { type: Number, default: 10 },
			closeable: { type: Boolean, default: false },
			showLink: { type: Boolean, default: false },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		computed: {
			scrollStyle() { return { animationDuration: this.speed + 's' } }
		},
		methods: {
			onClose(e) { this.$emit('close', e) },
			onLink(e) { this.$emit('link', e) }
		}
	}
</script>

<style scoped>
	.kit-notice-bar {
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		height: 72rpx;
		padding: 0 20rpx;
		border-radius: 8rpx;
		font-size: 26rpx;
	}

	.kit-notice-bar--warning { background-color: #fff7e6; color: #f08c00; }
	.kit-notice-bar--danger { background-color: #feeceb; color: #fa3534; }
	.kit-notice-bar--success { background-color: #e8f8ef; color: #18b566; }
	.kit-notice-bar--info { background-color: #eaf2ff; color: #2979ff; }

	.kit-notice-bar__icon {
		margin-right: 12rpx;
		font-size: 26rpx;
		font-weight: 600;
	}

	.kit-notice-bar__wrap {
		flex: 1;
		overflow: hidden;
	}

	.kit-notice-bar__text { white-space: nowrap; }
	.is-scroll { animation-name: kit-notice-scroll; animation-timing-function: linear; animation-iteration-count: infinite; }

	.kit-notice-bar__close, .kit-notice-bar__link {
		margin-left: 12rpx;
		font-size: 32rpx;
		line-height: 1;
	}

	@keyframes kit-notice-scroll {
		from { transform: translateX(100%); }
		to { transform: translateX(-100%); }
	}
</style>
