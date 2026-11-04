<template>
	<view class="kit-stepper" :class="{ 'is-disabled': disabled }" :style="customStyle">
		<view class="kit-stepper__btn kit-stepper__btn--minus" :class="{ 'is-off': !canMinus }" @click="onMinus">−</view>
		<input class="kit-stepper__input" type="number" :value="display" :disabled="disabled || !editable" @blur="onBlur" />
		<view class="kit-stepper__btn kit-stepper__btn--plus" :class="{ 'is-off': !canPlus }" @click="onPlus">+</view>
	</view>
</template>

<script>
	/** kit-stepper 步进器，双兼容 v-model（值为 Number） */
	export default {
		name: 'kit-stepper',
		emits: ['input', 'change', 'update:modelValue', 'update:value', 'minus', 'plus'],
		props: {
			value: { type: Number, default: 1 },
			modelValue: { type: Number, default: undefined },
			min: { type: Number, default: 0 },
			max: { type: Number, default: 999 },
			step: { type: Number, default: 1 },
			integer: { type: Boolean, default: true },
			editable: { type: Boolean, default: true },
			disabled: { type: Boolean, default: false },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		computed: {
			current() {
				const raw = this.modelValue === undefined || this.modelValue === null ? this.value : this.modelValue
				return Number(raw) || 0
			},
			display() { return String(this.current) },
			canMinus() { return !this.disabled && this.current - this.step >= this.min },
			canPlus() { return !this.disabled && this.current + this.step <= this.max }
		},
		methods: {
			clamp(n) {
				let v = Number(n)
				if (isNaN(v)) v = this.min
				if (this.integer) v = Math.round(v)
				if (v < this.min) v = this.min
				if (v > this.max) v = this.max
				return v
			},
			emitValue(v) {
				this.$emit('input', v)
				this.$emit('update:modelValue', v)
				this.$emit('update:value', v)
				this.$emit('change', v)
			},
			onMinus() {
				if (!this.canMinus) return
				this.emitValue(this.clamp(this.current - this.step))
				this.$emit('minus', this.current)
			},
			onPlus() {
				if (!this.canPlus) return
				this.emitValue(this.clamp(this.current + this.step))
				this.$emit('plus', this.current)
			},
			onBlur(e) {
				const v = this.clamp((e.detail && e.detail.value) || 0)
				this.emitValue(v)
			}
		}
	}
</script>

<style scoped>
	.kit-stepper {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
	}

	.is-disabled { opacity: 0.5; }

	.kit-stepper__btn {
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: 56rpx;
		height: 56rpx;
		font-size: 32rpx;
		line-height: 1;
		color: #303133;
		background-color: #f5f6f8;
		border: 1px solid #ebedf0;
	}

	.kit-stepper__btn--minus { border-radius: 8rpx 0 0 8rpx; }
	.kit-stepper__btn--plus { border-radius: 0 8rpx 8rpx 0; }
	.is-off { color: #c0c4cc; }

	.kit-stepper__input {
		box-sizing: border-box;
		width: 88rpx;
		height: 56rpx;
		font-size: 26rpx;
		color: #303133;
		text-align: center;
		background-color: #ffffff;
		border-top: 1px solid #ebedf0;
		border-bottom: 1px solid #ebedf0;
	}
</style>
