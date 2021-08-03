import { isFunction } from './utils';
import { observe } from './observer';

export function initState(vm) {
  const { $options } = vm;

  if ($options.data) {
    initData(vm);
  }

  if ($options.computed) {

  }

  if ($options.watch) {

  }
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

  // 数据劫持
  observe(data);

  // 将data的每个属性代理到vm身上
  for (let key in data) {
    proxy(vm, '_data', key);
  }
}