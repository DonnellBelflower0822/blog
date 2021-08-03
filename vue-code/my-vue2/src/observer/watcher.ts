import Dep, { popTarget, pushTarget } from './dep';
import { queueWatcher } from './scheduler';

interface Options {
  render?: boolean;
  user?: boolean;
  lazy?: boolean;
}
type Callback = (newValue: unknown, oldValue: unknown) => void;
type Fn = () => void;

let id = 0;
export default class Wacther {
  expOrFn: string | Fn;
  vm: any;
  callback: Callback;
  options: Options;
  getter: Fn;
  id: number;
  deps: Dep[];
  depsId: Set<number>;
  user: boolean;
  value: unknown;
  lazy: boolean;
  dirty: boolean;

  constructor(vm, expOrFn: string | Fn, callback: Callback, options: Options) {
    this.vm = vm;
    this.expOrFn = expOrFn;

    // 用户watcher,
    this.user = !!options.user;

    // 计算watcher
    this.lazy = !!options.lazy;
    this.dirty = options.lazy;

    this.callback = callback;
    this.options = options;
    this.id = id++;
    this.deps = [];
    this.depsId = new Set();

    if (typeof expOrFn === 'string') {
      this.getter = () => {
        // 取值, 将name收集watch的watcher
        return expOrFn.split('.').reduce((obj, key) => (obj[key]), vm);
      };
    } else {
      // 下面的逻辑也是去vm获取值
      this.getter = expOrFn;
    }

    this.value = this.lazy ? undefined : this.get();
  }

  get() {
    // 会走render, 走vm.a, 会走Object.defineProperty

    // 一个属性对应多个watcher
    // 一个watcher对应多个属性
    pushTarget(this);
    const newValue = this.getter.call(this.vm);
    popTarget();
    return newValue;
  }

  evaluate() {
    this.value = this.get();
    // 标记当前不脏了
    this.dirty = false;
  }

  update() {
    if (this.lazy) {
      this.dirty = true;
    } else {
      queueWatcher(this);
    }
  }

  run() {
    const newValue = this.get();
    const oldValue = this.value;

    if (this.user) {
      // wath 的 watcher
      this.callback.call(this.vm, newValue, oldValue);
    }

    this.value = newValue;
  }

  addDep(dep: Dep) {
    // 去重
    if (!this.depsId.has(dep.id)) {
      this.depsId.add(dep.id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }

  depend() {
    for (let i = 0; i < this.deps.length; i += 1) {
      // 让当前的属性收集渲染watcher
      this.deps[i].depend();
    }
  }
}