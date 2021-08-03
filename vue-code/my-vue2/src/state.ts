import { isFunction } from './utils';
import { observe } from './observer';
import Wacther from './observer/watcher';
import Dep from './observer/dep';

export function stateMixin(Vue) {
  Vue.prototype.$watch = function (key, handler, options = {}) {
    new Wacther(this, key, handler, { ...options, user: true });
  };
}

export function initState(vm) {
  const { $options } = vm;

  if ($options.data) {
    initData(vm);
  }

  if ($options.computed) {
    initComputed(vm);
  }

  if ($options.watch) {
    initWatch(vm);
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

function initWatch(vm) {
  const { watch } = vm.$options;
  for (const key in watch) {
    const handler = watch[key];
    if (Array.isArray(handler)) {
      handler.forEach(item => {
        createWatcher(vm, key, item);
      });
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, key, handler) {
  vm.$watch(key, handler);
}

function initComputed(vm) {
  const { computed } = vm.$options;

  const watchers = vm._computedWatchers = {};

  for (const key in computed) {
    const userDef = computed[key];
    const getter = typeof userDef === 'function' ? userDef : userDef.get;
    watchers[key] = new Wacther(vm, getter, () => { }, { lazy: true });

    // 将key定义到vm上
    defineComputed(vm, key, userDef);
  }
}

function defineComputed(vm, key, userDef) {
  const sharedProperty: { get?: () => unknown, set?: () => void; } = {};
  if (typeof userDef === 'function') {
    sharedProperty.get = createComputedGetter(key);
  } else {
    sharedProperty.get = createComputedGetter(key);
    sharedProperty.set = userDef.set;
  }
  Object.defineProperty(vm, key, sharedProperty);
}

function createComputedGetter(key) {
  return function () {
    const watcher = this._computedWatchers[key];
    // 如果是脏的计算
    if (watcher.dirty) {
      watcher.evaluate();
    }

    // 如果取值后还存在watcher, 也要收集
    // 存在渲染watcher, 计算watcher,
    // 但计算属性名不会生成dep,不进行依赖收集
    if (Dep.target) {
      watcher.depend();
    }

    return watcher.value;
  };
}