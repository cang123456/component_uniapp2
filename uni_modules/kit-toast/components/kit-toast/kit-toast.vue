<template>
	<view v-if="show" class="kit-toast" :class="'kit-toast--' + position" @touchmove.stop.prevent="noop">
		<view class="kit-toast__box">
			<text v-if="iconText" class="kit-toast__icon">{{ iconText }}</text>
			<text class="kit-toast__text">{{ message }}</text>
		</view>
	</view>
</template>

<script>
	/**
	 * kit-toast 轻提示（受控显隐，自动关闭）
	 * Vue3: <kit-toast v-model:show="visible" message="保存成功" />
	 * Vue2: <kit-toast :show="visible" @update:show="visible = $event" />
	 * 也可以不传 duration（设为 0），由页面自己控制关闭时机
	 */
	export default {
		name: 'kit-toast',
		emits: ['update:show', 'close'],
		props: {
			show: { type: Boolean, default: false },
			message: { type: String, default: '' },
			type: { type: String, default: 'none' },
			position: { type: String, default: 'center' },
			duration: { type: Number, default: 2000 }
		},
		computed: {
			iconText() {
				const map = { success: '✓', error: '✕', warning: '!', loading: '◌' }
				return map[this.type] || ''
			}
		},
		watch: {
			show(val) {
				this.clearTimer()
				if (val && this.duration > 0) {
					this.timer = setTimeout(this.hide, this.duration)
				}
			}
		},
		beforeDestroy() { this.clearTimer() },
		beforeUnmount() { this.clearTimer() },
		mounted() {
			// 初始 show 就为 true 时也要能自动关闭
			if (this.show && this.duration > 0) this.timer = setTimeout(this.hide, this.duration)
		},
		methods: {
			noop() {},
			clearTimer() {
				if (this.timer) {
					clearTimeout(this.timer)
					this.timer = null
				}
			},
			hide() {
				this.clearTimer()
				this.$emit('update:show', false)
				this.$emit('close')
			}
		},
		data() { return { timer: null } }
	}
</script>

<style scoped>
	.kit-toast {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1100;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.kit-toast--top { align-items: flex-start; padding-top: 160rpx; }
	.kit-toast--bottom { align-items: flex-end; padding-bottom: 200rpx; }

	.kit-toast__box {
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		max-width: 560rpx;
		padding: 24rpx 36rpx;
		border-radius: 12rpx;
		background-color: rgba(0, 0, 0, 0.8);
	}

	.kit-toast__icon {
		margin-bottom: 10rpx;
		font-size: 44rpx;
		line-height: 1;
		color: #ffffff;
	}

	.kit-toast__text {
		font-size: 26rpx;
		line-height: 1.5;
		color: #ffffff;
		text-align: center;
	}
</style>
