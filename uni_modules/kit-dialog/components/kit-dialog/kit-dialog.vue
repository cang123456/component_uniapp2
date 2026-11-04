<template>
	<view v-if="show" class="kit-dialog" @touchmove.stop.prevent="noop">
		<view class="kit-dialog__mask" @click="onMaskClick"></view>
		<view class="kit-dialog__panel">
			<text v-if="title" class="kit-dialog__title">{{ title }}</text>
			<view class="kit-dialog__content">
				<slot>{{ content }}</slot>
			</view>
			<view class="kit-dialog__footer">
				<slot name="footer">
					<view v-if="showCancel" class="kit-dialog__btn kit-dialog__btn--cancel" @click="onCancel">{{ cancelText }}</view>
					<view class="kit-dialog__btn kit-dialog__btn--confirm" :style="{ color: confirmColor }" @click="onConfirm">{{ confirmText }}</view>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * kit-dialog 对话框（受控组件）
	 * 显隐完全由父组件的 show 决定，组件自身不修改状态：
	 *   Vue3  : <kit-dialog v-model:show="visible" />
	 *   Vue2  : <kit-dialog :show="visible" @update:show="visible = $event" />
	 */
	export default {
		name: 'kit-dialog',
		emits: ['confirm', 'cancel', 'close', 'update:show'],
		props: {
			show: { type: Boolean, default: false },
			title: { type: String, default: '提示' },
			content: { type: String, default: '' },
			confirmText: { type: String, default: '确定' },
			cancelText: { type: String, default: '取消' },
			showCancel: { type: Boolean, default: true },
			maskClosable: { type: Boolean, default: true },
			confirmColor: { type: String, default: '#2979ff' }
		},
		methods: {
			noop() {},
			hide() {
				this.$emit('update:show', false)
			},
			onMaskClick() {
				if (!this.maskClosable) return
				this.$emit('close')
				this.hide()
			},
			onCancel() {
				this.$emit('cancel')
				this.$emit('close')
				this.hide()
			},
			onConfirm() {
				this.$emit('confirm')
				this.hide()
			}
		}
	}
</script>

<style scoped>
	.kit-dialog {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 999;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.kit-dialog__mask {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		animation: kit-dialog-fade 0.18s ease-out;
	}

	.kit-dialog__panel {
		position: relative;
		z-index: 1;
		width: 560rpx;
		box-sizing: border-box;
		overflow: hidden;
		border-radius: 20rpx;
		background-color: #ffffff;
		animation: kit-dialog-pop 0.18s ease-out;
	}

	.kit-dialog__title {
		display: block;
		box-sizing: border-box;
		padding: 40rpx 32rpx 0;
		font-size: 32rpx;
		font-weight: 600;
		color: #303133;
		text-align: center;
	}

	.kit-dialog__content {
		box-sizing: border-box;
		padding: 36rpx 40rpx 48rpx;
		font-size: 28rpx;
		line-height: 1.6;
		color: #606266;
		text-align: center;
	}

	.kit-dialog__footer {
		display: flex;
		flex-direction: row;
		border-top: 1px solid #ebedf0;
	}

	.kit-dialog__btn {
		flex: 1;
		box-sizing: border-box;
		height: 96rpx;
		font-size: 30rpx;
		line-height: 96rpx;
		text-align: center;
	}

	.kit-dialog__btn--cancel {
		color: #606266;
		border-right: 1px solid #ebedf0;
	}

	.kit-dialog__btn--confirm { font-weight: 600; }

	@keyframes kit-dialog-fade {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes kit-dialog-pop {
		from { opacity: 0; transform: scale(0.88); }
		to { opacity: 1; transform: scale(1); }
	}
</style>
