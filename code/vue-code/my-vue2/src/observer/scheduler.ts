import { nextTick } from 'src/utils';
import Wacther from './watcher';

let queue: Wacther[] = [];
let has = {};
let pending = false;

function flushSchedulerQueue() {
  for (let i = 0; i < queue.length; i += 1) {
    queue[i].run();
  }

  queue = [];
  has = {};
  pending = false;
}

// 同步代码执行完才走异步更新
export function queueWatcher(watcher: Wacther) {
  if (!has[watcher.id]) {
    queue.push(watcher);
    has[watcher.id] = true;
  }
  if (!pending) {
    pending = true;
    nextTick(flushSchedulerQueue);
  }
}