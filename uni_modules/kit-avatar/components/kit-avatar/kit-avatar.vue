<template>
	<view class="kit-avatar" :style="avatarStyle" @click="onClick">
		<image v-if="src" class="kit-avatar__img" :src="src" :mode="mode"></image>
		<text v-else class="kit-avatar__text" :style="{ fontSize: textSize }">{{ displayText }}</text>
		<slot></slot>
	</view>
</template>

<script>
	/**
	 * kit-avatar 头像
	 * src 由调用方传入（组件本身不携带任何图片资源），不传时用文字首字母占位
	 */
	export default {
		name: 'kit-avatar',
		emits: ['click'],
		props: {
			src: { type: String, default: '' },
			text: { type: String, default: '' },
			size: { type: String, default: '80rpx' },
			shape: { type: String, default: 'circle' },
			bgColor: { type: String, default: '#eaf2ff' },
			color: { type: String, default: '#2979ff' },
			textSize: { type: String, default: '28rpx' },
			mode: { type: String, default: 'aspectFill' },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		computed: {
			displayText() { return this.text ? String(this.text).slice(0, 2) : '?' },
			avatarStyle() {
				const base = {
					width: this.size,
					height: this.size,
					backgroundColor: this.bgColor,
					color: this.color,
					borderRadius: this.shape === 'square' ? '12rpx' : '50%'
				}
				if (Array.isArray(this.customStyle)) return [base].concat(this.customStyle)
				if (this.customStyle && typeof this.customStyle === 'object') return Object.assign({}, base, this.customStyle)
				return [base, this.customStyle]
			}
		},
		methods: {
			onClick(e) { this.$emit('click', e) }
		}
	}
</script>

<style scoped>
	.kit-avatar {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.kit-avatar__img { width: 100%; height: 100%; }
	.kit-avatar__text { line-height: 1; }
</style>
