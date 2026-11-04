<template>
	<view class="kit-divider" :style="customStyle">
		<view class="kit-divider__line" :class="{ 'is-dashed': dashed }" :style="lineStyle"></view>
		<text v-if="text || $slots.default" class="kit-divider__text" :style="{ color: textColor }">
			<slot>{{ text }}</slot>
		</text>
		<view v-if="text || $slots.default" class="kit-divider__line" :class="{ 'is-dashed': dashed }" :style="lineStyle"></view>
	</view>
</template>

<script>
	/** kit-divider 分割线，中间可放文字或插槽 */
	export default {
		name: 'kit-divider',
		props: {
			text: { type: String, default: '' },
			dashed: { type: Boolean, default: false },
			color: { type: String, default: '#dcdfe6' },
			textColor: { type: String, default: '#909399' },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		computed: {
			lineStyle() {
				return this.dashed ? { borderTopColor: this.color } : { backgroundColor: this.color }
			}
		}
	}
</script>

<style scoped>
	.kit-divider {
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		padding: 20rpx 0;
	}

	.kit-divider__line {
		flex: 1;
		height: 1px;
	}

	.is-dashed {
		height: 0;
		background-color: transparent;
		border-top: 1px dashed #dcdfe6;
	}

	.kit-divider__text {
		padding: 0 20rpx;
		font-size: 24rpx;
		line-height: 1.5;
		text-align: center;
	}
</style>
