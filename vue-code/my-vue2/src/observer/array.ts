export let arrayMethods = Object.create(Array.prototype);

const methods = [
  'push',
  'pop',
  'shift',
  'unshit',
  'splice',
  'sort',
  'reverse'
];

methods.forEach(method => {
  // 原来的方法
  const oldMethod = arrayMethods[method];
  arrayMethods[method] = function (...args) {
    const arrInstance = this;
    console.log('数组发生变化');

    oldMethod.call(arrInstance, ...args);

    // 对数组操作会新值数据的进行数据劫持
    let inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
      default:
        break;
    }

    const { __ob__: observer } = arrInstance;

    if (inserted) {
      observer.observeArray(inserted);
    }

    observer.dep.notify();
  };
});
