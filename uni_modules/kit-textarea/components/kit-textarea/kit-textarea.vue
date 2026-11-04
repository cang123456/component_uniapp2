<template>
	<view class="kit-textarea" :class="{ 'is-disabled': disabled }" :style="customStyle">
		<textarea class="kit-textarea__control" :value="current" :placeholder="placeholder"
			placeholder-style="color:#c0c4cc" :disabled="disabled" :maxlength="realMax"
			:auto-height="autoHeight" :style="{ minHeight: height }"
			@input="onInput" @focus="onFocus" @blur="onBlur" />
		<text v-if="showCount" class="kit-textarea__count">{{ textLength }}/{{ realMax }}</text>
	</view>
</template>

<script>
	/** kit-textarea 多行输入框（带字数统计），双兼容 v-model */
	export default {
		name: 'kit-textarea',
		emits: ['input', 'change', 'update:modelValue', 'update:value', 'focus', 'blur'],
		props: {
			value: { type: String, default: '' },
			modelValue: { type: String, default: undefined },
			placeholder: { type: String, default: '' },
			maxlength: { type: Number, default: -1 },
			height: { type: String, default: '180rpx' },
			autoHeight: { type: Boolean, default: false },
			showCount: { type: Boolean, default: true },
			disabled: { type: Boolean, default: false },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		computed: {
			current() {
				return this.modelValue === undefined || this.modelValue === null ? this.value : this.modelValue
			},
			// uni-app 的 textarea 不接受 -1，这里做一次兜底
			realMax() { return this.maxlength > 0 ? this.maxlength : 140 },
			textLength() { return String(this.current || '').length }
		},
		methods: {
			emitValue(v) {
				this.$emit('input', v)
				this.$emit('update:modelValue', v)
				this.$emit('update:value', v)
				this.$emit('change', v)
			},
			onInput(e) { this.emitValue(e.detail.value) },
			onFocus(e) { this.$emit('focus', e) },
			onBlur(e) { this.$emit('blur', e) }
		}
	}
</script>

<style scoped>
	.kit-textarea {
		box-sizing: border-box;
		padding: 20rpx;
		border: 1px solid #dcdfe6;
		border-radius: 8rpx;
		background-color: #ffffff;
	}

	.is-disabled { background-color: #f5f6f8; opacity: 0.7; }

	.kit-textarea__control {
		display: block;
		width: 100%;
		box-sizing: border-box;
		font-size: 28rpx;
		line-height: 1.6;
		color: #303133;
	}

	.kit-textarea__count {
		display: block;
		margin-top: 8rpx;
		font-size: 22rpx;
		color: #a8abb2;
		text-align: right;
	}
</style>
