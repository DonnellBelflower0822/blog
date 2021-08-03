import { initMixin } from './init';
import { lifecycleMixin } from './lifecycle';
import { renderMixin } from './render';
import { stateMixin } from './state';

function Vue(this, options) {
  this._init(options);
}

initMixin(Vue);
renderMixin(Vue);
lifecycleMixin(Vue);
stateMixin(Vue)

export default Vue;

