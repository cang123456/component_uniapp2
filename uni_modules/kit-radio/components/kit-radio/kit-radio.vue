<template>
	<view class="kit-radio" :class="{ 'is-inline': inline }" :style="customStyle">
		<view class="kit-radio__item" v-for="(opt, i) in normalized" :key="i" @click="onSelect(opt)">
			<view class="kit-radio__dot" :class="{ 'is-active': opt.value === current, 'is-disabled': opt.disabled || disabled }"
				:style="dotStyle(opt)">
				<view v-if="opt.value === current" class="kit-radio__inner" :style="{ backgroundColor: activeColor }"></view>
			</view>
			<text class="kit-radio__label">{{ opt.label }}</text>
		</view>
	</view>
</template>

<script>
	/**
	 * kit-radio 单选组
	 * options 支持 ['选项A','选项B'] 或 [{ label, value, disabled }]
	 * 用 options 数组而非插槽分组，避免小程序端跨组件通信的兼容问题
	 */
	export default {
		name: 'kit-radio',
		emits: ['input', 'change', 'update:modelValue', 'update:value'],
		props: {
			value: { type: [String, Number], default: '' },
			modelValue: { type: [String, Number], default: undefined },
			options: { type: Array, default: function () { return [] } },
			inline: { type: Boolean, default: false },
			activeColor: { type: String, default: '#2979ff' },
			disabled: { type: Boolean, default: false },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		computed: {
			current() {
				return this.modelValue === undefined || this.modelValue === null ? this.value : this.modelValue
			},
			normalized() {
				return this.options.map(function (item) {
					return typeof item === 'object' && item !== null
						? { label: item.label, value: item.value, disabled: !!item.disabled }
						: { label: String(item), value: item, disabled: false }
				})
			}
		},
		methods: {
			dotStyle(opt) {
				return opt.value === this.current ? { borderColor: this.activeColor } : {}
			},
			onSelect(opt) {
				if (this.disabled || opt.disabled || opt.value === this.current) return
				this.$emit('input', opt.value)
				this.$emit('update:modelValue', opt.value)
				this.$emit('update:value', opt.value)
				this.$emit('change', opt.value)
			}
		}
	}
</script>

<style scoped>
	.kit-radio { display: flex; flex-direction: column; }
	.is-inline { flex-direction: row; flex-wrap: wrap; }

	.kit-radio__item {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 14rpx 0;
		margin-right: 32rpx;
	}

	.kit-radio__dot {
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: 36rpx;
		height: 36rpx;
		margin-right: 14rpx;
		border: 2rpx solid #c0c4cc;
		border-radius: 50%;
	}

	.is-active { border-color: #2979ff; }
	.is-disabled { opacity: 0.45; }

	.kit-radio__inner {
		width: 18rpx;
		height: 18rpx;
		border-radius: 50%;
	}

	.kit-radio__label { font-size: 28rpx; color: #303133; }
</style>
