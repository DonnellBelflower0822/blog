import Wacther from './observer/watcher';
import { nextTick } from './utils';
import { patch } from './vdom/patch';

export function mountComponent(vm, el) {
  callHook(vm, 'beforeMount');
  
  // 渲染和更新都会调用
  const updateComponent = () => {
    vm._update(vm._render());
  };

  // 观察者: 属性是被观测者, 刷新页面是观察者
  // updateComponent();
  new Wacther(
    vm,
    updateComponent,
    () => {
      console.log('渲染页面');
    },
    { render: true }
  );
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    // 渲染和更新
    const vm = this;
    vm.$el = patch(vm.$el, vnode);
  };

  Vue.prototype.$nextTick = nextTick;
}

export function callHook(vm, hook) {
  const hooks = vm.$options[hook] || [];
  hooks.forEach(item => {
    item.call(vm);
  });
}