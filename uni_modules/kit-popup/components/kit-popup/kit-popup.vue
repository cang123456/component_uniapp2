<template>
	<view v-if="show" class="kit-popup" :class="'kit-popup--' + position" @touchmove.stop.prevent="noop">
		<view class="kit-popup__mask" @click="onMaskClick"></view>
		<view class="kit-popup__content" :class="['kit-popup__content--' + position, { 'is-round': round }]" :style="contentStyle">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	/**
	 * kit-popup 弹出层（受控显隐）
	 * position: center | top | bottom | left | right
	 * 内容完全由默认插槽提供，不依赖其他组件
	 */
	export default {
		name: 'kit-popup',
		emits: ['update:show', 'close'],
		props: {
			show: { type: Boolean, default: false },
			position: { type: String, default: 'bottom' },
			round: { type: Boolean, default: true },
			maskClosable: { type: Boolean, default: true },
			bgColor: { type: String, default: '#ffffff' },
			width: { type: String, default: '' },
			height: { type: String, default: '' }
		},
		computed: {
			contentStyle() {
				const s = { backgroundColor: this.bgColor }
				if (this.position === 'left' || this.position === 'right') {
					s.width = this.width || '70%'
					s.height = '100%'
				} else {
					if (this.width) s.width = this.width
					if (this.height) s.height = this.height
				}
				return s
			}
		},
		methods: {
			noop() {},
			hide() {
				this.$emit('update:show', false)
				this.$emit('close')
			},
			onMaskClick() {
				if (this.maskClosable) this.hide()
			}
		}
	}
</script>

<style scoped>
	.kit-popup {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1000;
		display: flex;
		flex-direction: row;
	}

	.kit-popup--bottom { align-items: flex-end; }
	.kit-popup--top { align-items: flex-start; }
	.kit-popup--center { align-items: center; justify-content: center; }
	.kit-popup--left { justify-content: flex-start; }
	.kit-popup--right { justify-content: flex-end; }

	.kit-popup__mask {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		animation: kit-popup-fade 0.2s ease-out;
	}

	.kit-popup__content {
		position: relative;
		z-index: 1;
		box-sizing: border-box;
		overflow: hidden;
		animation: kit-popup-in 0.2s ease-out;
	}

	.kit-popup__content--bottom, .kit-popup__content--top { width: 100%; }
	.kit-popup__content--bottom.is-round { border-radius: 24rpx 24rpx 0 0; }
	.kit-popup__content--top.is-round { border-radius: 0 0 24rpx 24rpx; }
	.kit-popup__content--center.is-round { border-radius: 20rpx; }

	@keyframes kit-popup-fade {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes kit-popup-in {
		from { opacity: 0; transform: scale(0.96); }
		to { opacity: 1; transform: scale(1); }
	}
</style>
