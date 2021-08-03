import { isObject } from 'src/utils';
import { arrayMethods } from './array';
import Dep from './dep';

// 对对象的所有属性进行劫持
class Observer {
  dep: Dep;
  constructor(data) {
    this.dep = new Dep();

    const observer = this;
    // 为对象和数组增加__ob__执行Observer实例
    // 可以表示是否已被观测过
    Object.defineProperty(data, '__ob__', {
      get() {
        return observer;
      },
      // 标记不可枚举
      enumerable: false
    });

    if (Array.isArray(data)) {
      // 对实例的原型方法进行修改
      //@ts-ignore
      data.__proto__ = arrayMethods;

      // 数组中的数据是对象, 需要监控对象
      this.observeArray(data);
    } else {
      this.walk(data);
    }
  }

  // 为对象的每个属性进行劫持
  walk(data) {
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key]);
    });
  }

  // 对数据的子项进行数据劫持
  observeArray(data) {
    data.forEach(element => {
      observe(element);
    });
  }
}

function dependArray(value) {
  value.forEach(item => {
    if (isObject(item) && item.__ob__) {
      item.__ob__.dep.depend();
      if (Array.isArray(item)) {
        dependArray(item);
      }
    }
  });
}

function defineReactive(obj, key, value) {
  // 递归value,如果是对象,继续劫持
  const childObserver = observe(value);

  // 为每个属性增加dep
  let dep = new Dep();

  Object.defineProperty(obj, key, {
    get() {
      // 获取时将Watcher和Dep关联起来
      // wathcer ??
      if (Dep.target) {
        dep.depend();

        if (childObserver) {
          // 让最外层的数组和对象也记录当前watcher
          childObserver.dep.depend();

          // 递归内层的数组也收集当前的watcher
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set(newVal) {
      if (newVal !== value) {
        // 新设置的值也要递归劫持
        observe(newVal);
        value = newVal;
        dep.notify();
      }
    }
  });
}

// 数据劫持
export function observe(data): Observer | undefined {
  if (!isObject(data)) {
    return;
  }

  // 如果数据已被观测过,数据会有__ob__属性,指向observer实例
  if (data.__ob__) {
    return data.__ob__ as Observer;
  }

  return new Observer(data);
}