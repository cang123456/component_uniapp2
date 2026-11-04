<template>
	<view class="kit-tabs" :style="customStyle">
		<scroll-view class="kit-tabs__scroll" scroll-x :show-scrollbar="false">
			<view class="kit-tabs__inner">
				<view class="kit-tabs__item" v-for="(t, i) in normalized" :key="i"
					:class="{ 'is-active': i === current }" @click="onSelect(i)">
					<text class="kit-tabs__label" :style="i === current ? { color: color } : {}">{{ t.title }}</text>
				</view>
				<view class="kit-tabs__line" :style="lineStyle"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	/**
	 * kit-tabs 标签页（只负责标签头，内容由页面根据 change 事件自己切换）
	 * tabs: ['选项A','选项B'] 或 [{ title }]，双兼容 v-model 绑定选中索引
	 */
	export default {
		name: 'kit-tabs',
		emits: ['input', 'change', 'update:modelValue', 'update:value'],
		props: {
			value: { type: Number, default: 0 },
			modelValue: { type: Number, default: undefined },
			tabs: { type: Array, default: function () { return [] } },
			color: { type: String, default: '#2979ff' },
			lineColor: { type: String, default: '#2979ff' },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		computed: {
			current() {
				const raw = this.modelValue === undefined || this.modelValue === null ? this.value : this.modelValue
				return Number(raw) || 0
			},
			normalized() {
				return this.tabs.map(function (t) {
					return typeof t === 'object' && t !== null ? { title: t.title } : { title: String(t) }
				})
			},
			lineStyle() {
				const count = this.normalized.length || 1
				const w = 100 / count
				return {
					width: w + '%',
					left: this.current * w + '%',
					backgroundColor: this.lineColor
				}
			}
		},
		methods: {
			onSelect(i) {
				if (i === this.current) return
				this.$emit('input', i)
				this.$emit('update:modelValue', i)
				this.$emit('update:value', i)
				this.$emit('change', i)
			}
		}
	}
</script>

<style scoped>
	.kit-tabs { background-color: #ffffff; }
	.kit-tabs__scroll { width: 100%; height: 88rpx; }

	.kit-tabs__inner {
		position: relative;
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 88rpx;
	}

	.kit-tabs__item {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		height: 88rpx;
	}

	.kit-tabs__label { font-size: 28rpx; color: #606266; }
	.is-active .kit-tabs__label { font-weight: 600; }

	.kit-tabs__line {
		position: absolute;
		bottom: 0;
		height: 4rpx;
		border-radius: 4rpx;
		transition: left 0.2s ease;
	}
</style>
