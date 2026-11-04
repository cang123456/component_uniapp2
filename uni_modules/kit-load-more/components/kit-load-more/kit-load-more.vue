<template>
	<view class="kit-load-more" :style="customStyle" @click="onClick">
		<view v-if="status === 'loading'" class="kit-load-more__spinner"
			:style="{ borderColor: color, borderTopColor: 'transparent' }"></view>
		<text class="kit-load-more__text" :style="{ color: textColor }">{{ displayText }}</text>
	</view>
</template>

<script>
	/** kit-load-more 加载更多，status: loading | more | noMore | fail */
	export default {
		name: 'kit-load-more',
		emits: ['click'],
		props: {
			status: { type: String, default: 'more' },
			loadingText: { type: String, default: '加载中...' },
			moreText: { type: String, default: '上拉加载更多' },
			noMoreText: { type: String, default: '没有更多了' },
			failText: { type: String, default: '加载失败，点击重试' },
			color: { type: String, default: '#909399' },
			textColor: { type: String, default: '#909399' },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		computed: {
			displayText() {
				const map = {
					loading: this.loadingText,
					more: this.moreText,
					noMore: this.noMoreText,
					fail: this.failText
				}
				return map[this.status] || this.moreText
			}
		},
		methods: {
			onClick(e) { this.$emit('click', e) }
		}
	}
</script>

<style scoped>
	.kit-load-more {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 30rpx 0;
	}

	.kit-load-more__spinner {
		box-sizing: border-box;
		width: 26rpx;
		height: 26rpx;
		margin-right: 12rpx;
		border-width: 3rpx;
		border-style: solid;
		border-radius: 50%;
		animation: kit-load-more-spin 0.7s linear infinite;
	}

	.kit-load-more__text { font-size: 24rpx; }

	@keyframes kit-load-more-spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
</style>
