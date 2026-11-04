<template>
	<view class="kit-input" :class="{ 'is-disabled': disabled, 'is-error': error, 'is-border': border }" :style="customStyle">
		<slot name="prefix"></slot>
		<input class="kit-input__control" :value="current" :type="type" :password="password"
			:placeholder="placeholder" placeholder-style="color:#c0c4cc" :disabled="disabled"
			:maxlength="maxlength" :focus="focus" :confirm-type="confirmType"
			@input="onInput" @focus="onFocus" @blur="onBlur" @confirm="onConfirm" />
		<text v-if="clearable && hasValue && !disabled" class="kit-input__clear" @click.stop="onClear">×</text>
		<slot name="suffix"></slot>
	</view>
</template>

<script>
	/**
	 * kit-input 输入框
	 * 双兼容 v-model：Vue2 用 value+input，Vue3 用 modelValue+update:modelValue，
	 * 也支持 v-model:value / :value + @input 的显式写法
	 */
	export default {
		name: 'kit-input',
		emits: ['input', 'change', 'update:modelValue', 'update:value', 'focus', 'blur', 'confirm', 'clear'],
		props: {
			value: { type: [String, Number], default: '' },
			modelValue: { type: [String, Number], default: undefined },
			type: { type: String, default: 'text' },
			placeholder: { type: String, default: '' },
			password: { type: Boolean, default: false },
			disabled: { type: Boolean, default: false },
			clearable: { type: Boolean, default: false },
			error: { type: Boolean, default: false },
			border: { type: Boolean, default: true },
			focus: { type: Boolean, default: false },
			maxlength: { type: Number, default: -1 },
			confirmType: { type: String, default: 'done' },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		computed: {
			current() {
				return this.modelValue === undefined || this.modelValue === null ? this.value : this.modelValue
			},
			hasValue() {
				return String(this.current === undefined || this.current === null ? '' : this.current).length > 0
			}
		},
		methods: {
			emitValue(v) {
				this.$emit('input', v)
				this.$emit('update:modelValue', v)
				this.$emit('update:value', v)
				this.$emit('change', v)
			},
			onInput(e) {
				this.emitValue(e.detail.value)
			},
			onClear() {
				this.emitValue('')
				this.$emit('clear')
			},
			onFocus(e) { this.$emit('focus', e) },
			onBlur(e) { this.$emit('blur', e) },
			onConfirm(e) { this.$emit('confirm', e.detail.value) }
		}
	}
</script>

<style scoped>
	.kit-input {
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		height: 80rpx;
		padding: 0 20rpx;
		background-color: #ffffff;
		border-radius: 8rpx;
	}

	.is-border { border: 1px solid #dcdfe6; }
	.is-error { border-color: #fa3534; }
	.is-disabled { background-color: #f5f6f8; opacity: 0.7; }

	.kit-input__control {
		flex: 1;
		height: 76rpx;
		font-size: 28rpx;
		color: #303133;
	}

	.kit-input__clear {
		margin-left: 12rpx;
		font-size: 34rpx;
		line-height: 1;
		color: #c0c4cc;
	}
</style>
