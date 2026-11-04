/**
 * uni-kit-ui 入口（28 个组件）
 *
 * 作用：给「显式 import / npm 引入」这种方式用的聚合出口。
 * 推荐的使用方式仍然是把 uni_modules 目录拷进项目，由 easycom 自动引入，
 * 那种方式在小程序端最稳，也无需写下面这些 import。
 *
 * 注意：小程序端不支持 Vue 全局注册，install() 只对 H5 / App 生效；
 *      小程序端请使用 easycom（uni_modules 目录）或页面内局部注册。
 */
import KitButton from './uni_modules/kit-button/components/kit-button/kit-button.vue'
import KitTag from './uni_modules/kit-tag/components/kit-tag/kit-tag.vue'
import KitCard from './uni_modules/kit-card/components/kit-card/kit-card.vue'
import KitEmpty from './uni_modules/kit-empty/components/kit-empty/kit-empty.vue'
import KitDialog from './uni_modules/kit-dialog/components/kit-dialog/kit-dialog.vue'

import KitInput from './uni_modules/kit-input/components/kit-input/kit-input.vue'
import KitTextarea from './uni_modules/kit-textarea/components/kit-textarea/kit-textarea.vue'
import KitSearch from './uni_modules/kit-search/components/kit-search/kit-search.vue'
import KitSwitch from './uni_modules/kit-switch/components/kit-switch/kit-switch.vue'
import KitStepper from './uni_modules/kit-stepper/components/kit-stepper/kit-stepper.vue'
import KitRate from './uni_modules/kit-rate/components/kit-rate/kit-rate.vue'
import KitRadio from './uni_modules/kit-radio/components/kit-radio/kit-radio.vue'
import KitCheckbox from './uni_modules/kit-checkbox/components/kit-checkbox/kit-checkbox.vue'

import KitToast from './uni_modules/kit-toast/components/kit-toast/kit-toast.vue'
import KitLoading from './uni_modules/kit-loading/components/kit-loading/kit-loading.vue'
import KitPopup from './uni_modules/kit-popup/components/kit-popup/kit-popup.vue'
import KitActionSheet from './uni_modules/kit-action-sheet/components/kit-action-sheet/kit-action-sheet.vue'
import KitNoticeBar from './uni_modules/kit-notice-bar/components/kit-notice-bar/kit-notice-bar.vue'
import KitProgress from './uni_modules/kit-progress/components/kit-progress/kit-progress.vue'

import KitBadge from './uni_modules/kit-badge/components/kit-badge/kit-badge.vue'
import KitIcon from './uni_modules/kit-icon/components/kit-icon/kit-icon.vue'
import KitAvatar from './uni_modules/kit-avatar/components/kit-avatar/kit-avatar.vue'
import KitDivider from './uni_modules/kit-divider/components/kit-divider/kit-divider.vue'

import KitCell from './uni_modules/kit-cell/components/kit-cell/kit-cell.vue'
import KitTabs from './uni_modules/kit-tabs/components/kit-tabs/kit-tabs.vue'
import KitSteps from './uni_modules/kit-steps/components/kit-steps/kit-steps.vue'
import KitLoadMore from './uni_modules/kit-load-more/components/kit-load-more/kit-load-more.vue'
import KitSkeleton from './uni_modules/kit-skeleton/components/kit-skeleton/kit-skeleton.vue'

const components = {
  KitButton,
  KitTag,
  KitCard,
  KitEmpty,
  KitDialog,
  KitInput,
  KitTextarea,
  KitSearch,
  KitSwitch,
  KitStepper,
  KitRate,
  KitRadio,
  KitCheckbox,
  KitToast,
  KitLoading,
  KitPopup,
  KitActionSheet,
  KitNoticeBar,
  KitProgress,
  KitBadge,
  KitIcon,
  KitAvatar,
  KitDivider,
  KitCell,
  KitTabs,
  KitSteps,
  KitLoadMore,
  KitSkeleton
}

export function install(app) {
  Object.keys(components).forEach(function (key) {
    var item = components[key]
    var name = item.name || key.replace(/([A-Z])/g, '-$1').toLowerCase()
    app.component(name, item)
  })
}

export {
  KitButton, KitTag, KitCard, KitEmpty, KitDialog,
  KitInput, KitTextarea, KitSearch, KitSwitch, KitStepper, KitRate, KitRadio, KitCheckbox,
  KitToast, KitLoading, KitPopup, KitActionSheet, KitNoticeBar, KitProgress,
  KitBadge, KitIcon, KitAvatar, KitDivider,
  KitCell, KitTabs, KitSteps, KitLoadMore, KitSkeleton
}
export default { install: install, components: components }
