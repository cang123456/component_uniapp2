<template>
	<view class="kit-card" :class="{ 'is-shadow': shadow, 'is-border': border }" :style="{ borderRadius: radius }"
		@click="onClick">
		<view v-if="title || extra || $slots.header || $slots.extra" class="kit-card__head">
			<slot name="header">
				<view class="kit-card__title">
					<view v-if="title" class="kit-card__bar"></view>
					<text>{{ title }}</text>
				</view>
				<view v-if="extra || $slots.extra" class="kit-card__extra">
					<slot name="extra">{{ extra }}</slot>
				</view>
			</slot>
		</view>
		<view class="kit-card__body" :style="{ padding: padding }">
			<slot></slot>
		</view>
		<view v-if="$slots.footer" class="kit-card__foot">
			<slot name="footer"></slot>
		</view>
	</view>
</template>

<script>
	/**
	 * kit-card 卡片
	 * 零依赖、单文件自包含，可直接复制到任意 uni-app 项目使用
	 */
	export default {
		name: 'kit-card',
		emits: ['click'],
		props: {
			title: { type: String, default: '' },
			extra: { type: String, default: '' },
			padding: { type: String, default: '24rpx' },
			radius: { type: String, default: '16rpx' },
			shadow: { type: Boolean, default: true },
			border: { type: Boolean, default: false }
		},
		methods: {
			onClick(e) {
				this.$emit('click', e)
			}
		}
	}
</script>

<style scoped>
	.kit-card {
		box-sizing: border-box;
		overflow: hidden;
		background-color: #ffffff;
	}

	.is-shadow { box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05); }
	.is-border { border: 1px solid #ebedf0; }

	.kit-card__head {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 24rpx;
		border-bottom: 1px solid #f2f3f5;
	}

	.kit-card__title {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 30rpx;
		font-weight: 600;
		color: #303133;
	}

	.kit-card__bar {
		width: 6rpx;
		height: 28rpx;
		margin-right: 12rpx;
		border-radius: 6rpx;
		background-color: #2979ff;
	}

	.kit-card__extra {
		font-size: 24rpx;
		color: #909399;
	}

	.kit-card__body {
		box-sizing: border-box;
		font-size: 28rpx;
		color: #606266;
		line-height: 1.7;
	}

	.kit-card__foot {
		box-sizing: border-box;
		padding: 20rpx 24rpx;
		border-top: 1px solid #f2f3f5;
	}
</style>
