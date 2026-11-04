<template>
	<view class="kit-steps" :class="'kit-steps--' + direction" :style="customStyle">
		<view class="kit-steps__item" v-for="(s, i) in normalized" :key="i">
			<view class="kit-steps__rail">
				<view class="kit-steps__dot" :style="dotStyle(i)">{{ i < active ? '✓' : String(i + 1) }}</view>
				<view v-if="i < normalized.length - 1" class="kit-steps__line"
					:style="{ backgroundColor: i < active ? activeColor : '#e4e7ed' }"></view>
			</view>
			<view class="kit-steps__body">
				<text class="kit-steps__title" :style="{ color: i <= active ? '#303133' : '#909399' }">{{ s.title }}</text>
				<text v-if="s.desc" class="kit-steps__desc">{{ s.desc }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	/** kit-steps 步骤条，steps: [{ title, desc }] 或 ['第一步','第二步'] */
	export default {
		name: 'kit-steps',
		props: {
			steps: { type: Array, default: function () { return [] } },
			active: { type: Number, default: 0 },
			direction: { type: String, default: 'vertical' },
			activeColor: { type: String, default: '#2979ff' },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		computed: {
			normalized() {
				return this.steps.map(function (s) {
					return typeof s === 'object' && s !== null
						? { title: s.title, desc: s.desc || '' }
						: { title: String(s), desc: '' }
				})
			}
		},
		methods: {
			dotStyle(i) {
				const on = i <= this.active
				return {
					backgroundColor: on ? this.activeColor : '#ffffff',
					borderColor: on ? this.activeColor : '#dcdfe6',
					color: on ? '#ffffff' : '#909399'
				}
			}
		}
	}
</script>

<style scoped>
	.kit-steps--vertical { display: flex; flex-direction: column; }
	.kit-steps--horizontal { display: flex; flex-direction: row; }

	.kit-steps--vertical .kit-steps__item { display: flex; flex-direction: row; }
	.kit-steps--horizontal .kit-steps__item { display: flex; flex: 1; flex-direction: column; align-items: center; }

	.kit-steps--vertical .kit-steps__rail {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 48rpx;
	}

	.kit-steps--horizontal .kit-steps__rail {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
	}

	.kit-steps__dot {
		display: flex;
		flex: none;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: 36rpx;
		height: 36rpx;
		font-size: 20rpx;
		border: 2rpx solid #dcdfe6;
		border-radius: 50%;
		z-index: 1;
	}

	.kit-steps--vertical .kit-steps__line {
		flex: 1;
		width: 2rpx;
		min-height: 48rpx;
	}

	.kit-steps--horizontal .kit-steps__line {
		position: absolute;
		top: 18rpx;
		left: 50%;
		width: 100%;
		height: 2rpx;
	}

	.kit-steps--vertical .kit-steps__body {
		display: flex;
		flex: 1;
		flex-direction: column;
		padding: 0 0 40rpx 16rpx;
	}

	.kit-steps--horizontal .kit-steps__body {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 12rpx;
	}

	.kit-steps__title { font-size: 26rpx; text-align: center; }
	.kit-steps__desc { margin-top: 8rpx; font-size: 22rpx; color: #a8abb2; text-align: center; }
</style>
