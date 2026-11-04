<template>
	<view class="kit-rate" :style="customStyle">
		<text v-for="i in count" :key="i" class="kit-rate__star"
			:style="{ fontSize: size, color: i <= current ? color : voidColor }" @click="onSelect(i)">{{ i <= current ? '★' : '☆' }}</text>
	</view>
</template>

<script>
	/** kit-rate 评分（★/☆ 为文本字符，无字体文件依赖），双兼容 v-model */
	export default {
		name: 'kit-rate',
		emits: ['input', 'change', 'update:modelValue', 'update:value'],
		props: {
			value: { type: Number, default: 0 },
			modelValue: { type: Number, default: undefined },
			count: { type: Number, default: 5 },
			size: { type: String, default: '44rpx' },
			color: { type: String, default: '#ff9900' },
			voidColor: { type: String, default: '#dcdfe6' },
			disabled: { type: Boolean, default: false },
			readonly: { type: Boolean, default: false },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		computed: {
			current() {
				const raw = this.modelValue === undefined || this.modelValue === null ? this.value : this.modelValue
				return Number(raw) || 0
			}
		},
		methods: {
			onSelect(i) {
				if (this.disabled || this.readonly) return
				this.$emit('input', i)
				this.$emit('update:modelValue', i)
				this.$emit('update:value', i)
				this.$emit('change', i)
			}
		}
	}
</script>

<style scoped>
	.kit-rate {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
	}

	.kit-rate__star {
		margin-right: 10rpx;
		line-height: 1.2;
	}
</style>
