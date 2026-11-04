<template>
	<text class="kit-icon" :style="iconStyle" @click="onClick">{{ glyph }}</text>
</template>

<script>
	/**
	 * kit-icon 图标
	 * 用通用文本符号而不是字体文件，零资源依赖、拷贝到任何项目都不会缺图标。
	 * 若某个端缺少某个字形，可以直接把字符传给 name（会原样显示）。
	 */
	const GLYPHS = {
		success: '✓', check: '✓', error: '✕', close: '×', warning: '!', info: 'i',
		plus: '+', minus: '−', left: '‹', right: '›', up: '⌃', down: '⌄',
		star: '★', 'star-o': '☆', heart: '♥', 'heart-o': '♡',
		dot: '●', 'dot-o': '○', more: '⋯', search: '⌕',
		clock: '◷', edit: '✎', refresh: '⟳', setting: '⚙',
		user: '☺', home: '⌂', phone: '☎', location: '⌖'
	}

	export default {
		name: 'kit-icon',
		emits: ['click'],
		props: {
			name: { type: String, default: 'success' },
			size: { type: String, default: '36rpx' },
			color: { type: String, default: '#303133' },
			customStyle: { type: [String, Object, Array], default: '' }
		},
		computed: {
			glyph() { return GLYPHS[this.name] || this.name },
			iconStyle() {
				const base = { fontSize: this.size, lineHeight: this.size, color: this.color }
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
	.kit-icon {
		display: inline-block;
		text-align: center;
	}
</style>
