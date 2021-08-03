import { mergeOptions } from 'src/utils';

export function initGlobalApi(Vue) {
  Vue.options = {};

  Vue.mixins = function (options) {
    // {} {beforeCreate:fn} => {beforeCreate:[fn]}
    // {beforeCreate:[fn]} {beforeCreate:fn} => {beforeCreate:[fn,fn]}
    this.options = mergeOptions(this.options, options);
    return this;
  };

  Vue.options._base = Vue;
  Vue.options.components = {};
  Vue.component = function (id, defintion) {
    defintion = this.options._base.extend(defintion);
    this.options.components[id] = defintion;
  };

  Vue.extend = function (opts) {
    const Sub = function VueComponent() {
      this._init();
    };
    Sub.prototype = Object.create(this.prototype);
    Sub.prototype.constructor = Sub;
    Sub.options = mergeOptions(this.options, opts);

    return Sub;
  };
}