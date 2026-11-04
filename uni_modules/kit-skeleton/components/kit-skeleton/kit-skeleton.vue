<template>
	<view class="kit-skeleton-wrap" :style="customStyle">
		<slot v-if="!loading"></slot>
		<view v-else class="kit-skeleton" :class="{ 'is-animate': animate }">
			<view v-if="avatar || title" class="kit-skeleton__head">
				<view v-if="avatar" class="kit-skeleton__avatar" :style="{ width: avatarSize, height: avatarSize }"></view>
				<view v-if="title" class="kit-skeleton__title"></view>
			</view>
			<view class="kit-skeleton__row" v-for="i in rows" :key="i" :style="{ width: rowWidth(i) }"></view>
		</view>
	</view>
</template>

<script>
	/**
	 * kit-skeleton 骨架屏
	 * loading 为 false 时渲染默认插槽里的真实内容，方便直接包裹页面区域
	 */
	export default {
		name: 'kit-skeleton',
		props: {
			loading: { type: Boolean, default: true },
			rows: { type: Number, default: 3 },
			avatar: { type: Boolean, default: false },
			title: { type: Boolean, default: false },
			avatarSize: { type: String, default: '80rpx' },
			animate: { type: Boolean, default: true },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		methods: {
			rowWidth(i) {
				if (i === this.rows) return '60%'
				return i % 2 === 0 ? '100%' : '88%'
			}
		}
	}
</script>

<style scoped>
	.kit-skeleton-wrap { width: 100%; }

	.kit-skeleton__head {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 24rpx;
	}

	.kit-skeleton__avatar { border-radius: 50%; background-color: #f2f3f5; }
	.kit-skeleton__title { flex: 1; height: 28rpx; margin-left: 20rpx; border-radius: 6rpx; background-color: #f2f3f5; }

	.kit-skeleton__row {
		height: 26rpx;
		margin-bottom: 20rpx;
		border-radius: 6rpx;
		background-color: #f2f3f5;
	}

	.is-animate .kit-skeleton__avatar,
	.is-animate .kit-skeleton__title,
	.is-animate .kit-skeleton__row {
		animation: kit-skeleton-flash 1.4s ease-in-out infinite;
	}

	@keyframes kit-skeleton-flash {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.5; }
	}
</style>
