<template>
	<view class="kit-search" :style="customStyle">
		<view class="kit-search__field" :style="{ backgroundColor: bgColor }">
			<view class="kit-search__icon"><view class="kit-search__handle"></view></view>
			<input class="kit-search__input" :value="current" :placeholder="placeholder"
				placeholder-style="color:#a8abb2" confirm-type="search" :disabled="disabled"
				@input="onInput" @confirm="onSearch" />
			<text v-if="clearable && hasValue" class="kit-search__clear" @click.stop="onClear">×</text>
		</view>
		<text v-if="showAction" class="kit-search__action" @click="onAction">{{ actionText }}</text>
	</view>
</template>

<script>
	/** kit-search 搜索框（放大镜为纯 CSS 绘制），双兼容 v-model */
	export default {
		name: 'kit-search',
		emits: ['input', 'change', 'update:modelValue', 'update:value', 'search', 'clear', 'action'],
		props: {
			value: { type: String, default: '' },
			modelValue: { type: String, default: undefined },
			placeholder: { type: String, default: '请输入关键词' },
			bgColor: { type: String, default: '#f5f6f8' },
			clearable: { type: Boolean, default: true },
			showAction: { type: Boolean, default: true },
			actionText: { type: String, default: '搜索' },
			disabled: { type: Boolean, default: false },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		computed: {
			current() {
				return this.modelValue === undefined || this.modelValue === null ? this.value : this.modelValue
			},
			hasValue() { return String(this.current || '').length > 0 }
		},
		methods: {
			emitValue(v) {
				this.$emit('input', v)
				this.$emit('update:modelValue', v)
				this.$emit('update:value', v)
				this.$emit('change', v)
			},
			onInput(e) { this.emitValue(e.detail.value) },
			onClear() {
				this.emitValue('')
				this.$emit('clear')
			},
			onSearch(e) { this.$emit('search', e.detail.value || this.current) },
			onAction() {
				this.$emit('search', this.current)
				this.$emit('action', this.current)
			}
		}
	}
</script>

<style scoped>
	.kit-search {
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
	}

	.kit-search__field {
		display: flex;
		flex: 1;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		height: 72rpx;
		padding: 0 20rpx;
		border-radius: 999rpx;
	}

	.kit-search__icon {
		position: relative;
		width: 24rpx;
		height: 24rpx;
		margin-right: 16rpx;
		box-sizing: border-box;
		border: 3rpx solid #909399;
		border-radius: 50%;
	}

	.kit-search__handle {
		position: absolute;
		right: -10rpx;
		bottom: -5rpx;
		width: 14rpx;
		height: 3rpx;
		border-radius: 2rpx;
		background-color: #909399;
		transform: rotate(45deg);
	}

	.kit-search__input {
		flex: 1;
		height: 68rpx;
		font-size: 26rpx;
		color: #303133;
	}

	.kit-search__clear {
		margin-left: 10rpx;
		font-size: 32rpx;
		line-height: 1;
		color: #a8abb2;
	}

	.kit-search__action {
		margin-left: 20rpx;
		font-size: 28rpx;
		color: #2979ff;
	}
</style>
