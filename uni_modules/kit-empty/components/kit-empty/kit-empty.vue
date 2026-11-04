<template>
	<view class="kit-empty" :style="customStyle">
		<view v-if="showIcon" class="kit-empty__art">
			<slot name="image">
				<view class="kit-empty__halo"></view>
				<view class="kit-empty__box"></view>
				<view class="kit-empty__lid"></view>
				<view class="kit-empty__dot kit-empty__dot--a"></view>
				<view class="kit-empty__dot kit-empty__dot--b"></view>
			</slot>
		</view>
		<text v-if="text" class="kit-empty__text">{{ text }}</text>
		<text v-if="description" class="kit-empty__desc">{{ description }}</text>
		<view v-if="$slots.default" class="kit-empty__action">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	/**
	 * kit-empty 空状态
	 * 插图由纯 CSS 绘制，不依赖任何图片资源，拷贝到别的项目不会出现图片 404
	 */
	export default {
		name: 'kit-empty',
		props: {
			text: { type: String, default: '暂无数据' },
			description: { type: String, default: '' },
			showIcon: { type: Boolean, default: true },
			customStyle: { type: [String, Object, Array], default: '' }
		}
	}
</script>

<style scoped>
	.kit-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		padding: 60rpx 24rpx;
	}

	.kit-empty__art {
		position: relative;
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 24rpx;
	}

	.kit-empty__halo {
		position: absolute;
		top: 0;
		left: 0;
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		background-color: #f0f5ff;
	}

	.kit-empty__box {
		position: absolute;
		top: 88rpx;
		left: 58rpx;
		width: 84rpx;
		height: 62rpx;
		box-sizing: border-box;
		border: 4rpx solid #b9cdf5;
		border-radius: 8rpx;
		background-color: #ffffff;
	}

	.kit-empty__lid {
		position: absolute;
		top: 74rpx;
		left: 50rpx;
		width: 100rpx;
		height: 14rpx;
		border-radius: 8rpx;
		background-color: #8fb1ee;
	}

	.kit-empty__dot {
		position: absolute;
		width: 12rpx;
		height: 12rpx;
		border-radius: 50%;
		background-color: #c9d9f7;
	}

	.kit-empty__dot--a { top: 40rpx; left: 34rpx; }
	.kit-empty__dot--b { top: 150rpx; left: 164rpx; width: 8rpx; height: 8rpx; }

	.kit-empty__text {
		font-size: 28rpx;
		color: #606266;
		line-height: 1.5;
	}

	.kit-empty__desc {
		margin-top: 12rpx;
		font-size: 24rpx;
		color: #a8abb2;
		line-height: 1.5;
		text-align: center;
	}

	.kit-empty__action {
		margin-top: 32rpx;
	}
</style>
