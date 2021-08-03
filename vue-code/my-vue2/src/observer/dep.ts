import Wacther from './watcher';

let id = 0;
class Dep {
  id: number;
  static target: Wacther = null;
  subs: Wacther[];
  constructor() {
    this.id = id++;
    this.subs = [];
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  addSub(watcher: Wacther) {
    this.subs.push(watcher);
  }

  notify() {
    this.subs.forEach(watcher => {
      watcher.update();
    });
  }
}

export default Dep;

export function pushTarget(watcher) {
  Dep.target = watcher;
}
export function popTarget() {
  Dep.target = null;
}