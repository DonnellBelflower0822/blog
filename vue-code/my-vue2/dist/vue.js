(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  const isFunction = (val) => typeof val === 'function';
  const isObject = (val) => val !== null && typeof val === 'object';

  // 对对象的所有属性进行劫持
  class Observer {
      constructor(data) {
          this.walk(data);
      }
      walk(data) {
          Object.keys(data).forEach(key => {
              defineReactive(data, key, data[key]);
          });
      }
  }
  function defineReactive(obj, key, value) {
      // 递归value,如果是对象,继续劫持
      observe(value);
      Object.defineProperty(obj, key, {
          get() {
              return value;
          },
          set(newVal) {
              // 新设置的值也要递归劫持
              observe(newVal);
              value = newVal;
          }
      });
  }
  function observe(data) {
      if (!isObject(data)) {
          return data;
      }
      return new Observer(data);
  }

  function initState(vm) {
      const { $options } = vm;
      if ($options.data) {
          initData(vm);
      }
      if ($options.computed) ;
      if ($options.watch) ;
  }
  // 将vm.a 代理到 vm._data.a
  function proxy(vm, source, key) {
      Object.defineProperty(vm, key, {
          get() {
              return vm[source][key];
          },
          set(value) {
              vm[source][key] = value;
          }
      });
  }
  // 数据劫持
  function initData(vm) {
      let { data } = vm.$options;
      data = vm._data = isFunction(data) ? data.call(vm) : data;
      observe(data);
      for (let key in data) {
          proxy(vm, '_data', key);
      }
      console.log(vm);
  }

  function initMixin(Vue) {
      Vue.prototype._init = function (options) {
          this.$options = options;
          // 对数据进行响应式(data,computed)
          initState(this);
      };
  }

  function Vue(options) {
      this._init(options);
  }
  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
