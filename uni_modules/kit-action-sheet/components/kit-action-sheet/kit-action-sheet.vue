<template>
	<view v-if="show" class="kit-sheet" @touchmove.stop.prevent="noop">
		<view class="kit-sheet__mask" @click="onMaskClick"></view>
		<view class="kit-sheet__panel">
			<text v-if="title" class="kit-sheet__title">{{ title }}</text>
			<view class="kit-sheet__list">
				<view class="kit-sheet__item" v-for="(a, i) in actions" :key="i"
					:class="{ 'is-disabled': a.disabled }" @click="onSelect(a, i)">
					<text class="kit-sheet__name">{{ a.name }}</text>
					<text v-if="a.subname" class="kit-sheet__sub">{{ a.subname }}</text>
				</view>
			</view>
			<view v-if="cancelText" class="kit-sheet__cancel" @click="onCancel">{{ cancelText }}</view>
		</view>
	</view>
</template>

<script>
	/** kit-action-sheet 动作面板（受控显隐），actions: [{ name, subname, disabled }] */
	export default {
		name: 'kit-action-sheet',
		emits: ['select', 'cancel', 'close', 'update:show'],
		props: {
			show: { type: Boolean, default: false },
			actions: { type: Array, default: function () { return [] } },
			title: { type: String, default: '' },
			cancelText: { type: String, default: '取消' },
			maskClosable: { type: Boolean, default: true }
		},
		methods: {
			noop() {},
			hide() {
				this.$emit('update:show', false)
				this.$emit('close')
			},
			onMaskClick() {
				if (this.maskClosable) this.hide()
			},
			onSelect(action, index) {
				if (action.disabled) return
				this.$emit('select', index, action)
				this.hide()
			},
			onCancel() {
				this.$emit('cancel')
				this.hide()
			}
		}
	}
</script>

<style scoped>
	.kit-sheet {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1010;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
	}

	.kit-sheet__mask {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		animation: kit-sheet-fade 0.2s ease-out;
	}

	.kit-sheet__panel {
		position: relative;
		z-index: 1;
		width: 100%;
		box-sizing: border-box;
		padding: 0 20rpx 20rpx;
	}

	.kit-sheet__title {
		display: block;
		padding: 28rpx 0;
		font-size: 26rpx;
		color: #909399;
		text-align: center;
		background-color: #ffffff;
		border-radius: 20rpx 20rpx 0 0;
	}

	.kit-sheet__list {
		overflow: hidden;
		background-color: #ffffff;
		border-radius: 20rpx;
	}

	.kit-sheet__item {
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		padding: 28rpx 20rpx;
		border-bottom: 1px solid #f2f3f5;
	}

	.is-disabled { opacity: 0.4; }

	.kit-sheet__name { font-size: 30rpx; color: #303133; }
	.kit-sheet__sub { margin-top: 8rpx; font-size: 22rpx; color: #a8abb2; }

	.kit-sheet__cancel {
		margin-top: 16rpx;
		padding: 28rpx 0;
		font-size: 30rpx;
		color: #606266;
		text-align: center;
		background-color: #ffffff;
		border-radius: 20rpx;
	}

	@keyframes kit-sheet-fade {
		from { opacity: 0; }
		to { opacity: 1; }
	}
</style>
