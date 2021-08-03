import Dep, { popTarget, pushTarget } from './dep';
import { queueWatcher } from './scheduler';

interface Options {
  render?: boolean;
}
type Callback = () => void;
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

  constructor(vm, expOrFn: string | Fn, callback: Callback, options: Options) {
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.callback = callback;
    this.options = options;
    this.id = id++;
    this.deps = [];
    this.depsId = new Set();

    this.getter = expOrFn as Fn;

    this.get();
  }

  get() {
    // 会走render, 走vm.a, 会走Object.defineProperty

    // 一个属性对应多个watcher
    // 一个watcher对应多个属性
    pushTarget(this);
    this.getter();
    popTarget();
  }

  update() {
    queueWatcher(this);
  }

  run() {
    this.get();
  }

  addDep(dep: Dep) {
    // 去重
    if (!this.depsId.has(dep.id)) {
      this.depsId.add(dep.id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }
}