<template>
	<view class="kit-cell" :class="{ 'is-border': border, 'is-clickable': clickable }" :style="customStyle" @click="onClick">
		<text v-if="icon" class="kit-cell__icon" :style="{ color: iconColor }">{{ icon }}</text>
		<slot name="icon"></slot>
		<view class="kit-cell__body">
			<text class="kit-cell__title">{{ title }}</text>
			<text v-if="label" class="kit-cell__label">{{ label }}</text>
			<slot name="label"></slot>
		</view>
		<view class="kit-cell__right">
			<slot name="value"><text v-if="value" class="kit-cell__value">{{ value }}</text></slot>
			<slot name="right"></slot>
			<text v-if="arrow" class="kit-cell__arrow">›</text>
		</view>
	</view>
</template>

<script>
	/**
	 * kit-cell 单元格（列表项）
	 * 页面里直接 v-for 多个 kit-cell 包一层容器即可，不需要额外的 group 组件
	 */
	export default {
		name: 'kit-cell',
		emits: ['click'],
		props: {
			title: { type: String, default: '' },
			label: { type: String, default: '' },
			value: { type: [String, Number], default: '' },
			icon: { type: String, default: '' },
			iconColor: { type: String, default: '#2979ff' },
			arrow: { type: Boolean, default: false },
			clickable: { type: Boolean, default: false },
			border: { type: Boolean, default: true },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		methods: {
			onClick(e) { this.$emit('click', e) }
		}
	}
</script>

<style scoped>
	.kit-cell {
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		padding: 26rpx 24rpx;
		background-color: #ffffff;
	}

	.is-border { border-bottom: 1px solid #f2f3f5; }

	.kit-cell__icon {
		margin-right: 16rpx;
		font-size: 34rpx;
	}

	.kit-cell__body {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
	}

	.kit-cell__title { font-size: 28rpx; color: #303133; }
	.kit-cell__label { margin-top: 6rpx; font-size: 22rpx; color: #a8abb2; }

	.kit-cell__right {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 16rpx;
	}

	.kit-cell__value { font-size: 26rpx; color: #909399; }
	.kit-cell__arrow { margin-left: 10rpx; font-size: 36rpx; line-height: 1; color: #c0c4cc; }
</style>
