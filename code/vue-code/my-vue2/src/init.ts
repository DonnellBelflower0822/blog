import { compileToFunction } from './compiler';
import { callHook, mountComponent } from './lifecycle';
import { initState } from './state';
import { mergeOptions } from './utils';

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    // this.constructor = Vue
    vm.$options = mergeOptions(this.constructor.options, options);

    // 处理数据之前
    callHook(vm, 'beforeCreate');

    // 对数据进行响应式(data,computed)
    initState(vm);
    
    callHook(vm, 'created');

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };

  Vue.prototype.$mount = function (el) {
    const vm = this;
    el = vm.$el = document.querySelector(el);

    // 把模板转换成渲染函数, -> 调用渲染函数产生vnode -> diff 更新虚拟dom -> 产生真实节点,更新

    // 准备好render渲染函数
    if (!vm.$options.render) {
      let template = vm.$options.template;

      if (!template && el) {
        template = el.outerHTML;
      }

      // 通过template生成渲染函数
      const render = compileToFunction(template);
      vm.$options.render = render;
    }

    // 挂载组件
    mountComponent(vm, el);
  };
}