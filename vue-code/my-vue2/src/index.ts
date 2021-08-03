import { initMixin } from './init';

function Vue(this, options) {
  this._init(options);
}

initMixin(Vue);

export default Vue;