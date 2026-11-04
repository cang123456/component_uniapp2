<template>
	<view class="kit-switch" :class="{ 'is-on': current, 'is-disabled': disabled, 'is-small': size === 'small' }"
		:style="switchStyle" @click="onToggle">
		<view class="kit-switch__node"></view>
	</view>
</template>

<script>
	/** kit-switch 开关，双兼容 v-model（值为 Boolean） */
	export default {
		name: 'kit-switch',
		emits: ['input', 'change', 'update:modelValue', 'update:value'],
		props: {
			value: { type: Boolean, default: false },
			modelValue: { type: Boolean, default: undefined },
			activeColor: { type: String, default: '#2979ff' },
			inactiveColor: { type: String, default: '#e4e7ed' },
			size: { type: String, default: 'normal' },
			disabled: { type: Boolean, default: false },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		computed: {
			current() {
				return this.modelValue === undefined || this.modelValue === null ? this.value : this.modelValue
			},
			switchStyle() {
				const style = { backgroundColor: this.current ? this.activeColor : this.inactiveColor }
				return Array.isArray(this.customStyle)
					? [style].concat(this.customStyle)
					: (this.customStyle && typeof this.customStyle === 'object')
						? Object.assign({}, style, this.customStyle)
						: [style, this.customStyle]
			}
		},
		methods: {
			onToggle() {
				if (this.disabled) return
				const next = !this.current
				this.$emit('input', next)
				this.$emit('update:modelValue', next)
				this.$emit('update:value', next)
				this.$emit('change', next)
			}
		}
	}
</script>

<style scoped>
	.kit-switch {
		position: relative;
		display: inline-block;
		box-sizing: border-box;
		width: 92rpx;
		height: 52rpx;
		border-radius: 999rpx;
		transition: background-color 0.2s;
	}

	.is-small { width: 72rpx; height: 40rpx; }
	.is-disabled { opacity: 0.5; }

	.kit-switch__node {
		position: absolute;
		top: 4rpx;
		left: 4rpx;
		width: 44rpx;
		height: 44rpx;
		border-radius: 50%;
		background-color: #ffffff;
		box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.18);
		transition: transform 0.2s;
	}

	.is-small .kit-switch__node { width: 32rpx; height: 32rpx; }
	.is-on .kit-switch__node { transform: translateX(40rpx); }
	.is-small.is-on .kit-switch__node { transform: translateX(32rpx); }
</style>
