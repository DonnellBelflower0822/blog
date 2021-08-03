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

  observe(data);

  for (let key in data) {
    proxy(vm, '_data', key);
  }

  console.log(vm);
}