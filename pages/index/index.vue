<template>
	<view class="page">
		<view class="hero">
			<text class="hero__title">uni-kit-ui</text>
			<text class="hero__desc">28 个组件 · 零依赖 · 拷走就能用</text>
			<view class="hero__tags">
				<view class="tag-cell"><kit-tag type="primary" size="small" text="uni_modules" /></view>
				<view class="tag-cell"><kit-tag type="success" size="small" text="easycom" /></view>
				<view class="tag-cell"><kit-tag type="warning" size="small" text="Vue2 / Vue3" /></view>
			</view>
			<text class="hero__tip">模板里直接写标签，无需 import / 注册 / 装依赖。下方用 kit-tabs 切换分类。</text>
		</view>

		<kit-tabs v-model="tabIndex" :tabs="tabs" @change="onTabChange"></kit-tabs>

		<!-- ================= 基础 4 ================= -->
		<view v-if="tabIndex === 0">
			<view class="section">
				<view class="section__head"><text class="section__title">Button 按钮</text><text class="section__id">kit-button</text></view>
				<text class="label">主题 / 尺寸</text>
				<view class="row">
					<view class="cell" v-for="t in types" :key="t"><kit-button :type="t" size="small" :text="t" @click="note('button · ' + t)"></kit-button></view>
				</view>
				<view class="row">
					<view class="cell" v-for="s in sizes" :key="s"><kit-button type="primary" :size="s" :text="s" @click="note('size · ' + s)"></kit-button></view>
				</view>
				<text class="label">状态与形状</text>
				<view class="row">
					<view class="cell"><kit-button type="primary" plain>镂空</kit-button></view>
					<view class="cell"><kit-button type="success" round>圆角</kit-button></view>
					<view class="cell"><kit-button disabled>禁用</kit-button></view>
				</view>
				<kit-button type="primary" block text="块级按钮" @click="note('block 按钮')"></kit-button>
			</view>

			<view class="section">
				<view class="section__head"><text class="section__title">Tag 标签</text><text class="section__id">kit-tag</text></view>
				<view class="row">
					<view class="cell" v-for="(tag, i) in tags" :key="tag.text"><kit-tag :type="tag.type" closable round @close="removeTag(i)">{{ tag.text }}</kit-tag></view>
				</view>
				<view class="row">
					<view class="cell" v-for="t in types" :key="'p-' + t"><kit-tag :type="t" plain :text="t" /></view>
				</view>
				<text class="hint">点 × 移除标签，close 不会冒泡触发 click</text>
			</view>

			<view class="section">
				<view class="section__head"><text class="section__title">Card 卡片</text><text class="section__id">kit-card</text></view>
				<kit-card title="基础卡片" extra="2026-11-04">
					<view>标题、额外信息、内容区、底部区都可以通过属性或插槽配置。</view>
					<template v-slot:footer>
						<view class="card-foot"><text class="card-foot__text">共 3 条记录</text><kit-button size="mini" type="primary" text="查看" @click="note('card footer 按钮')"></kit-button></view>
					</template>
				</kit-card>
			</view>

			<view class="section">
				<view class="section__head"><text class="section__title">Empty 空状态</text><text class="section__id">kit-empty</text></view>
				<kit-empty text="暂无订单" description="插图由纯 CSS 绘制，不依赖任何图片文件">
					<kit-button size="small" type="primary" text="去逛逛" @click="note('empty 操作按钮')"></kit-button>
				</kit-empty>
			</view>
		</view>

		<!-- ================= 表单 8 ================= -->
		<view v-if="tabIndex === 1">
			<view class="section">
				<view class="section__head"><text class="section__title">Input / Textarea</text><text class="section__id">kit-input · kit-textarea</text></view>
				<text class="label">单行（Vue3 可直接 v-model）</text>
				<kit-input v-model="name" placeholder="请输入姓名" clearable />
				<text class="label">多行 + 字数统计</text>
				<kit-textarea v-model="content" :maxlength="100" placeholder="写点什么…" />
			</view>

			<view class="section">
				<view class="section__head"><text class="section__title">Search 搜索框</text><text class="section__id">kit-search</text></view>
				<kit-search v-model="keyword" @search="note('search · ' + keyword)" />
			</view>

			<view class="section">
				<view class="section__head"><text class="section__title">Switch / Stepper</text><text class="section__id">kit-switch · kit-stepper</text></view>
				<view class="row row--between">
					<text class="plain">消息推送</text>
					<kit-switch :value="enabled" @input="enabled = $event" @change="note('switch · ' + $event)" />
				</view>
				<view class="row row--between">
					<text class="plain">购买数量</text>
					<kit-stepper v-model="count" :min="1" :max="9" />
				</view>
			</view>

			<view class="section">
				<view class="section__head"><text class="section__title">Rate 评分</text><text class="section__id">kit-rate</text></view>
				<kit-rate v-model="score" @change="note('rate · ' + $event + ' 星')" />
			</view>

			<view class="section">
				<view class="section__head"><text class="section__title">Radio / Checkbox</text><text class="section__id">kit-radio · kit-checkbox</text></view>
				<text class="label">单选</text>
				<kit-radio v-model="picked" :options="radioOptions" inline />
				<text class="label">多选（最多 2 项）</text>
				<kit-checkbox v-model="checked" :options="checkOptions" inline :max="2" @overlimit="note('最多选 2 项')" />
			</view>
		</view>

		<!-- ================= 反馈 7 ================= -->
		<view v-if="tabIndex === 2">
			<view class="section">
				<view class="section__head"><text class="section__title">Dialog / Toast / Popup / ActionSheet</text><text class="section__id">4 个受控组件</text></view>
				<view class="row">
					<view class="cell"><kit-button size="small" type="primary" text="Dialog" @click="dialogShow = true"></kit-button></view>
					<view class="cell"><kit-button size="small" type="primary" text="Toast" @click="showToast"></kit-button></view>
					<view class="cell"><kit-button size="small" type="primary" text="Popup" @click="popupShow = true"></kit-button></view>
					<view class="cell"><kit-button size="small" type="primary" text="ActionSheet" @click="sheetShow = true"></kit-button></view>
				</view>
				<text class="hint">显隐都由页面变量控制：v-model:show 或 :show + @update:show</text>
			</view>

			<view class="section">
				<view class="section__head"><text class="section__title">Loading 加载</text><text class="section__id">kit-loading</text></view>
				<view class="row">
					<view class="cell"><kit-loading text="转圈" /></view>
					<view class="cell"><kit-loading type="dots" color="#18b566" text="跳点" /></view>
				</view>
			</view>

			<view class="section">
				<view class="section__head"><text class="section__title">NoticeBar 通知栏</text><text class="section__id">kit-notice-bar</text></view>
				<kit-notice-bar text="系统将于今晚 23:00 进行维护，请提前保存数据" type="warning" closeable @close="note('notice-bar 关闭')" />
			</view>

			<view class="section">
				<view class="section__head"><text class="section__title">Progress 进度条</text><text class="section__id">kit-progress</text></view>
				<kit-progress :percentage="progress" active />
				<view class="row">
					<view class="cell"><kit-button size="mini" text="-10" @click="progress = Math.max(0, progress - 10)"></kit-button></view>
					<view class="cell"><kit-button size="mini" type="primary" text="+10" @click="progress = Math.min(100, progress + 10)"></kit-button></view>
				</view>
			</view>
		</view>

		<!-- ================= 展示 4 ================= -->
		<view v-if="tabIndex === 3">
			<view class="section">
				<view class="section__head"><text class="section__title">Badge 徽标</text><text class="section__id">kit-badge</text></view>
				<view class="row">
					<view class="cell"><kit-badge :value="8"><kit-avatar text="消息" /></kit-badge></view>
					<view class="cell"><kit-badge :value="128" :max="99"><kit-avatar text="通知" bg-color="#fff4e5" color="#f08c00" /></kit-badge></view>
					<view class="cell"><kit-badge dot><kit-avatar text="动态" /></kit-badge></view>
				</view>
			</view>

			<view class="section">
				<view class="section__head"><text class="section__title">Icon 图标</text><text class="section__id">kit-icon</text></view>
				<view class="row">
					<view class="cell icon-cell" v-for="n in iconNames" :key="n">
						<kit-icon :name="n" size="44rpx" color="#2979ff" @click="note('icon · ' + n)" />
						<text class="icon-name">{{ n }}</text>
					</view>
				</view>
				<text class="hint">纯文本符号，无字体文件；缺字形时可直接把字符传给 name</text>
			</view>

			<view class="section">
				<view class="section__head"><text class="section__title">Avatar 头像</text><text class="section__id">kit-avatar</text></view>
				<view class="row">
					<view class="cell" v-for="(a, i) in avatars" :key="i"><kit-avatar :text="a.text" :shape="a.shape" :bg-color="a.bg" :color="a.color" /></view>
				</view>
			</view>

			<view class="section">
				<view class="section__head"><text class="section__title">Divider 分割线</text><text class="section__id">kit-divider</text></view>
				<kit-divider />
				<kit-divider text="没有更多了" dashed />
			</view>
		</view>

		<!-- ================= 导航 5 ================= -->
		<view v-if="tabIndex === 4">
			<view class="section">
				<view class="section__head"><text class="section__title">Cell 单元格</text><text class="section__id">kit-cell</text></view>
				<view class="cell-group">
					<kit-cell title="我的订单" value="3 条" arrow clickable @click="note('cell · 我的订单')" />
					<kit-cell title="账号与安全" label="已绑定手机号" icon="✓" arrow clickable @click="note('cell · 账号与安全')" />
					<kit-cell title="消息推送" :border="false">
						<template v-slot:right><kit-switch size="small" :value="enabled" @input="enabled = $event" /></template>
					</kit-cell>
				</view>
			</view>

			<view class="section">
				<view class="section__head"><text class="section__title">Tabs 标签页</text><text class="section__id">kit-tabs</text></view>
				<kit-tabs v-model="subTab" :tabs="['全部', '待付款', '已完成']" @change="note('tabs · 切到 ' + $event)" />
				<text class="hint">页面顶部的大分类切换器也是 kit-tabs</text>
			</view>

			<view class="section">
				<view class="section__head"><text class="section__title">Steps 步骤条</text><text class="section__id">kit-steps</text></view>
				<kit-steps :steps="stepItems" :active="1" direction="horizontal" />
				<view class="gap"></view>
				<kit-steps :steps="stepItems" :active="2" direction="vertical" />
			</view>

			<view class="section">
				<view class="section__head"><text class="section__title">LoadMore 加载更多</text><text class="section__id">kit-load-more</text></view>
				<kit-load-more v-for="s in loadStatus" :key="s" :status="s" @click="note('load-more · ' + s)" />
			</view>

			<view class="section">
				<view class="section__head"><text class="section__title">Skeleton 骨架屏</text><text class="section__id">kit-skeleton</text></view>
				<kit-skeleton :loading="skeletonLoading" :rows="3" avatar title>
					<view class="loaded">内容加载完成，这里显示真实数据。</view>
				</kit-skeleton>
				<kit-button size="small" :text="skeletonLoading ? '显示真实内容' : '再看骨架'" @click="skeletonLoading = !skeletonLoading"></kit-button>
			</view>
		</view>

		<view class="logger">
			<text class="logger__label">最近事件</text>
			<text class="logger__value">{{ log }}</text>
		</view>

		<!-- 全局受控浮层 -->
		<kit-dialog :show="dialogShow" @update:show="dialogShow = $event" title="删除确认"
			content="确定要删除这条记录吗？删除后不可恢复。" confirm-text="删除" confirm-color="#fa3534"
			@confirm="note('dialog · 确定')" @cancel="note('dialog · 取消')"></kit-dialog>
		<kit-toast :show="toastShow" @update:show="toastShow = $event" message="操作成功" type="success"></kit-toast>
		<kit-popup :show="popupShow" @update:show="popupShow = $event" position="bottom">
			<view class="popup-demo">
				<text class="popup-demo__title">底部弹出层</text>
				<text class="popup-demo__text">内容完全由默认插槽提供，可以放任意组件。</text>
				<kit-button type="primary" block text="关闭" @click="popupShow = false"></kit-button>
			</view>
		</kit-popup>
		<kit-action-sheet :show="sheetShow" @update:show="sheetShow = $event" title="请选择操作" :actions="sheetActions"
			@select="note('action-sheet · 选了第 ' + ($event + 1) + ' 项')" @cancel="note('action-sheet · 取消')"></kit-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: ['基础 4', '表单 8', '反馈 7', '展示 4', '导航 5'],
				tabIndex: 0,
				subTab: 0,
				types: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
				sizes: ['mini', 'small', 'normal', 'large'],
				tags: [
					{ text: '默认', type: 'default' },
					{ text: '推荐', type: 'primary' },
					{ text: '已完成', type: 'success' },
					{ text: '异常', type: 'danger' }
				],
				name: '',
				content: '',
				keyword: '',
				enabled: true,
				count: 2,
				score: 3,
				picked: 'A',
				checked: ['A'],
				radioOptions: [
					{ label: '选项 A', value: 'A' },
					{ label: '选项 B', value: 'B' },
					{ label: '禁用', value: 'C', disabled: true }
				],
				checkOptions: ['苹果', '香蕉', '橘子'],
				progress: 65,
				iconNames: ['success', 'error', 'warning', 'star', 'heart', 'plus', 'left', 'right', 'more'],
				avatars: [
					{ text: '张三', shape: 'circle', bg: '#eaf2ff', color: '#2979ff' },
					{ text: '订单', shape: 'square', bg: '#e8f8ef', color: '#18b566' },
					{ text: '客服', shape: 'circle', bg: '#fff4e5', color: '#f08c00' }
				],
				stepItems: [
					{ title: '提交订单', desc: '11-04 09:20' },
					{ title: '支付完成', desc: '11-04 09:22' },
					{ title: '待发货', desc: '预计 11-05' }
				],
				loadStatus: ['more', 'loading', 'noMore', 'fail'],
				skeletonLoading: true,
				sheetActions: [
					{ name: '拍照', subname: '调用系统相机' },
					{ name: '从相册选择' },
					{ name: '暂不可用', disabled: true }
				],
				dialogShow: false,
				toastShow: false,
				popupShow: false,
				sheetShow: false,
				log: '等待交互…'
			}
		},
		methods: {
			note(msg) {
				this.log = msg
			},
			onTabChange(i) {
				this.log = 'tabs · 切换到「' + this.tabs[i] + '」'
			},
			removeTag(index) {
				this.tags.splice(index, 1)
				this.note('tag · 移除了一个标签')
			},
			showToast() {
				this.toastShow = false
				const self = this
				setTimeout(function () { self.toastShow = true }, 30)
				this.note('toast · 弹出成功提示')
			}
		}
	}
</script>

<style>
	.page { min-height: 100vh; box-sizing: border-box; padding: 24rpx 24rpx 60rpx; background-color: #f5f6f8; }

	.hero {
		display: flex; flex-direction: column; align-items: flex-start;
		box-sizing: border-box; padding: 40rpx 32rpx; margin-bottom: 24rpx;
		border-radius: 20rpx; background-color: #2979ff;
	}
	.hero__title { font-size: 48rpx; font-weight: 700; color: #ffffff; }
	.hero__desc { margin-top: 10rpx; font-size: 26rpx; color: #dbe8ff; }
	.hero__tags { display: flex; flex-direction: row; flex-wrap: wrap; margin-top: 24rpx; }
	.hero__tip { margin-top: 24rpx; font-size: 22rpx; color: #dbe8ff; line-height: 1.6; }
	.tag-cell { margin-right: 12rpx; margin-bottom: 12rpx; }

	.section {
		box-sizing: border-box; padding: 28rpx 24rpx; margin-top: 24rpx;
		border-radius: 20rpx; background-color: #ffffff;
	}
	.section__head {
		display: flex; flex-direction: row; align-items: center; justify-content: space-between;
		padding-bottom: 20rpx; margin-bottom: 16rpx; border-bottom: 1px solid #f2f3f5;
	}
	.section__title { font-size: 29rpx; font-weight: 600; color: #303133; }
	.section__id { font-size: 22rpx; color: #a8abb2; }

	.label { display: block; margin: 16rpx 0 14rpx; font-size: 24rpx; color: #909399; }
	.hint { display: block; margin-top: 10rpx; font-size: 22rpx; color: #a8abb2; line-height: 1.6; }
	.plain { font-size: 28rpx; color: #303133; }

	.row { display: flex; flex-direction: row; flex-wrap: wrap; align-items: center; }
	.row--between { justify-content: space-between; margin-bottom: 20rpx; }
	.cell { margin: 0 16rpx 16rpx 0; }
	.gap { height: 24rpx; }

	.card-foot { display: flex; flex-direction: row; align-items: center; justify-content: space-between; }
	.card-foot__text { font-size: 24rpx; color: #909399; }
	.cell-group { margin: -24rpx; border-radius: 12rpx; overflow: hidden; }

	.icon-cell { display: flex; flex-direction: column; align-items: center; width: 100rpx; }
	.icon-name { margin-top: 6rpx; font-size: 18rpx; color: #909399; }

	.popup-demo { display: flex; flex-direction: column; box-sizing: border-box; padding: 40rpx 32rpx; }
	.popup-demo__title { font-size: 32rpx; font-weight: 600; color: #303133; }
	.popup-demo__text { margin: 16rpx 0 32rpx; font-size: 26rpx; color: #909399; line-height: 1.6; }
	.loaded { font-size: 28rpx; color: #18b566; padding: 20rpx 0 32rpx; }

	.logger {
		display: flex; flex-direction: column; box-sizing: border-box;
		padding: 24rpx; margin-top: 24rpx; border-radius: 16rpx; background-color: #eef2fb;
	}
	.logger__label { font-size: 22rpx; color: #8a97b8; }
	.logger__value { margin-top: 8rpx; font-size: 26rpx; color: #3b4a6b; }
</style>
