import { createElement, createTextElement } from './vdom';

export function renderMixin(Vue) {
  Vue.prototype._render = function () {
    const vnode = this.$options.render.call(this);
    return vnode;
  };

  // createElement
  Vue.prototype._c = function (tag, data, ...children) {
    return createElement(
      this,
      tag,
      data,
      children
    );
  };

  // createTextElement
  Vue.prototype._v = function (text) {
    return createTextElement(this, text);
  };

  // 值
  Vue.prototype._s = function (val) {
    return typeof val === 'object' ? JSON.stringify(val) : val;
  };
}