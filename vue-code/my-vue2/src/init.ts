import { initState } from './state';

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    this.$options = options;
    // 对数据进行响应式(data,computed)
    initState(this);
  };
}