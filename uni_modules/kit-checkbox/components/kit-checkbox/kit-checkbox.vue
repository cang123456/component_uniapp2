<template>
	<view class="kit-checkbox" :class="{ 'is-inline': inline }" :style="customStyle">
		<view class="kit-checkbox__item" v-for="(opt, i) in normalized" :key="i" @click="onToggle(opt)">
			<view class="kit-checkbox__box" :class="{ 'is-active': isChecked(opt), 'is-disabled': opt.disabled || disabled }"
				:style="boxStyle(opt)">
				<text v-if="isChecked(opt)" class="kit-checkbox__tick">✓</text>
			</view>
			<text class="kit-checkbox__label">{{ opt.label }}</text>
		</view>
	</view>
</template>

<script>
	/**
	 * kit-checkbox 多选组，值为数组
	 * options 支持 ['选项A','选项B'] 或 [{ label, value, disabled }]
	 */
	export default {
		name: 'kit-checkbox',
		emits: ['input', 'change', 'update:modelValue', 'update:value', 'overlimit'],
		props: {
			value: { type: Array, default: function () { return [] } },
			modelValue: { type: Array, default: undefined },
			options: { type: Array, default: function () { return [] } },
			inline: { type: Boolean, default: false },
			activeColor: { type: String, default: '#2979ff' },
			max: { type: Number, default: 0 },
			disabled: { type: Boolean, default: false },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		computed: {
			current() {
				return this.modelValue === undefined || this.modelValue === null ? this.value : this.modelValue
			},
			list() { return Array.isArray(this.current) ? this.current : [] },
			normalized() {
				return this.options.map(function (item) {
					return typeof item === 'object' && item !== null
						? { label: item.label, value: item.value, disabled: !!item.disabled }
						: { label: String(item), value: item, disabled: false }
				})
			}
		},
		methods: {
			isChecked(opt) { return this.list.indexOf(opt.value) !== -1 },
			boxStyle(opt) {
				return this.isChecked(opt)
					? { backgroundColor: this.activeColor, borderColor: this.activeColor }
					: {}
			},
			onToggle(opt) {
				if (this.disabled || opt.disabled) return
				const next = this.list.slice()
				const pos = next.indexOf(opt.value)
				if (pos === -1) {
					if (this.max > 0 && next.length >= this.max) {
						this.$emit('overlimit', this.max)
						return
					}
					next.push(opt.value)
				} else {
					next.splice(pos, 1)
				}
				this.$emit('input', next)
				this.$emit('update:modelValue', next)
				this.$emit('update:value', next)
				this.$emit('change', next)
			}
		}
	}
</script>

<style scoped>
	.kit-checkbox { display: flex; flex-direction: column; }
	.is-inline { flex-direction: row; flex-wrap: wrap; }

	.kit-checkbox__item {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 14rpx 0;
		margin-right: 32rpx;
	}

	.kit-checkbox__box {
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: 36rpx;
		height: 36rpx;
		margin-right: 14rpx;
		border: 2rpx solid #c0c4cc;
		border-radius: 6rpx;
		background-color: #ffffff;
	}

	.is-active { border-color: #2979ff; }
	.is-disabled { opacity: 0.45; }

	.kit-checkbox__tick {
		font-size: 24rpx;
		line-height: 1;
		color: #ffffff;
	}

	.kit-checkbox__label { font-size: 28rpx; color: #303133; }
</style>
