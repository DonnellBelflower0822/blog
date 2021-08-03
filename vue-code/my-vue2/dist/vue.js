(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{aaaaa}}
  function genProps(attrs) {
      return attrs.reduce((str, attr, index) => {
          if (attr.name === 'style') {
              const styleObj = {};
              attr.value.replace(/([^:;]+)\:([^:;]+)/g, (...args) => {
                  styleObj[args[1]] = args[2];
              });
              attr.value = styleObj;
          }
          return `${str}${index === 0 ? '' : ','}${attr.name}:${JSON.stringify(attr.value)}`;
      }, '');
  }
  function gen(ast) {
      // 元素
      if (ast.type === 1) {
          return generate(ast);
      }
      // 'hello-{{name}}world'
      let { text } = ast;
      if (!defaultTagRE.test(text)) {
          return `_v('${text}')`;
      }
      const tokens = [];
      let match;
      let lastIndex = defaultTagRE.lastIndex = 0;
      while (match = defaultTagRE.exec(text)) {
          let index = match.index;
          if (index > lastIndex) {
              tokens.push(JSON.stringify(text.slice(lastIndex, index)));
          }
          tokens.push(`_s(${match[1].trim()})`);
          lastIndex = index + match[0].length;
      }
      if (lastIndex < text.length) {
          tokens.push(JSON.stringify(text.slice(lastIndex)));
      }
      // _v("hello-"+name+"world")
      return `_v(${tokens.join('+')})`;
  }
  function genChildren(ast) {
      const { children } = ast;
      if (!children) {
          return '';
      }
      return children.map(child => gen(child)).join(',');
  }
  // ast -> render string
  function generate(ast) {
      const children = genChildren(ast);
      const code = `_c('${ast.tag}',${ast.attrs && ast.attrs.length ? `{${genProps(ast.attrs)}}` : 'undefined'}${children ? `,${children}` : ''})`;
      return code;
  }

  const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 标签名 
  const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //  用来获取的标签名的 match后的索引为1的
  const startTagOpen = new RegExp(`^<${qnameCapture}`); // 匹配开始标签的 
  const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配闭合标签的
  //           aa  =   "  xxx "  | '  xxxx '  | xxx
  const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // a=b  a="b"  a='b'
  const startTagClose = /^\s*(\/?)>/; //     />   <div/>
  let root;
  const stack = [];
  function createAstElement(tagName, attrs) {
      return {
          tag: tagName,
          type: 1,
          children: [],
          parent: null,
          attrs
      };
  }
  function start(tagName, attributes) {
      const parent = stack[stack.length - 1];
      const element = createAstElement(tagName, attributes);
      if (!root) {
          root = element;
      }
      element.parent = parent;
      if (parent) {
          parent.children.push(element);
      }
      stack.push(element);
  }
  function end(tagName) {
      const last = stack.pop();
      if (last.tag !== tagName) {
          console.error('标签有误');
      }
  }
  function chars(text) {
      text = text.replace(/\s/g, '');
      const parent = stack[stack.length - 1];
      if (text) {
          parent.children.push({ type: 3, text });
      }
  }
  function parserHTML(html) {
      function advance(len) {
          html = html.substring(len);
          return html;
      }
      function parserStartTag(html) {
          const start = html.match(startTagOpen);
          if (!start) {
              return false;
          }
          const match = {
              tagName: start[1],
              attrs: []
          };
          html = advance(start[0].length);
          let end;
          let attr;
          while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
              html = advance(attr[0].length);
              match.attrs.push({
                  name: attr[1],
                  value: attr[3] || attr[4] || attr[5]
              });
          }
          if (end) {
              html = advance(end[0].length);
          }
          return match;
      }
      while (html) {
          const textEnd = html.indexOf('<');
          if (textEnd === 0) {
              // 1. <div>
              // 开始
              const startTagMatch = parserStartTag(html);
              if (startTagMatch) {
                  start(startTagMatch.tagName, startTagMatch.attrs);
                  continue;
              }
              // 2. </div>
              // 结束
              const endTagMatch = html.match(endTag);
              if (endTagMatch) {
                  end(endTagMatch[1]);
                  html = advance(endTagMatch[0].length);
                  continue;
              }
          }
          // 文本
          let text;
          if (textEnd > 0) {
              text = html.substring(0, textEnd);
          }
          if (text) {
              chars(text);
              html = advance(text.length);
          }
      }
      return root;
  }

  function compileToFunction(template) {
      // 1. 将template转换成ast
      // '<div id="app"><div>{{name}}</div><div>{{name}}</div></div>'(string) -> ast:Ast
      // export interface Ast {
      // tag: string,
      // type: 1 | 3;
      // children: Ast[],
      // parent: Ast | null,
      // attrs: Attr[];
      // text?: string;
      // }
      const root = parserHTML(template);
      // 2. 对静态语法做静态标记
      // ast -> "_c('div',id="app",style={"color":"red","backgroundColor":" blue"},_c('div',undefined,_v("hello-"+name+"world")))"
      const code = generate(root);
      // 3. 重新生成代码
      // string -> render
      const render = new Function(`with(this){return ${code}}`);
      return render;
  }

  let id$1 = 0;
  class Dep {
      id;
      static target = null;
      subs;
      constructor() {
          this.id = id$1++;
          this.subs = [];
      }
      depend() {
          if (Dep.target) {
              Dep.target.addDep(this);
          }
      }
      addSub(watcher) {
          this.subs.push(watcher);
      }
      notify() {
          this.subs.forEach(watcher => {
              watcher.update();
          });
      }
  }
  function pushTarget(watcher) {
      Dep.target = watcher;
  }
  function popTarget() {
      Dep.target = null;
  }

  const isFunction = (val) => typeof val === 'function';
  const isObject = (val) => val !== null && typeof val === 'object';
  let waiting = false;
  const callbacks = [];
  let timerFn;
  if (Promise) {
      timerFn = () => { Promise.resolve().then(flushCallbacks); };
  }
  else if (MutationObserver) {
      const textNode = document.createTextNode('1');
      const observe = new MutationObserver(flushCallbacks);
      observe.observe(textNode, { characterData: true });
      timerFn = () => {
          textNode.textContent = '2';
      };
  }
  else if (setImmediate) {
      timerFn = () => {
          setImmediate(flushCallbacks);
      };
  }
  else {
      timerFn = () => {
          setTimeout(flushCallbacks);
      };
  }
  function flushCallbacks() {
      callbacks.forEach(cb => cb());
      waiting = false;
  }
  const nextTick = (cb) => {
      callbacks.push(cb);
      if (!waiting) {
          waiting = true;
          timerFn();
      }
  };

  let queue = [];
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
  function queueWatcher(watcher) {
      if (!has[watcher.id]) {
          queue.push(watcher);
          has[watcher.id] = true;
      }
      if (!pending) {
          pending = true;
          nextTick(flushSchedulerQueue);
      }
  }

  let id = 0;
  class Wacther {
      expOrFn;
      vm;
      callback;
      options;
      getter;
      id;
      deps;
      depsId;
      constructor(vm, expOrFn, callback, options) {
          this.vm = vm;
          this.expOrFn = expOrFn;
          this.callback = callback;
          this.options = options;
          this.id = id++;
          this.deps = [];
          this.depsId = new Set();
          this.getter = expOrFn;
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
      addDep(dep) {
          // 去重
          if (!this.depsId.has(dep.id)) {
              this.depsId.add(dep.id);
              this.deps.push(dep);
              dep.addSub(this);
          }
      }
  }

  /**
   * 渲染和更新
   * @param oldVnode 第一次渲染会传入真实dom,更新会传入上次的vnode
   * @param newVnode  新的vnode
   */
  function patch(oldVnode, newVnode) {
      if (oldVnode.nodeType === 1) {
          // 渲染
          const parentElm = oldVnode.parentNode;
          const elm = createElm(newVnode);
          parentElm.insertBefore(elm, oldVnode.nextSibling);
          parentElm.removeChild(oldVnode);
          return elm;
      }
      // 更新
  }
  // 根据vnode创建真实dom
  function createElm(vnode) {
      const { vm, tag, key, data, children, text } = vnode;
      if (typeof tag === 'string') {
          // el指向真实节点
          vnode.el = document.createElement(tag);
          children.forEach(child => {
              vnode.el.appendChild(createElm(child));
          });
      }
      else {
          vnode.el = document.createTextNode(text);
      }
      return vnode.el;
  }

  function mountComponent(vm, el) {
      // 渲染和更新都会调用
      const updateComponent = () => {
          vm._update(vm._render());
      };
      // 观察者: 属性是被观测者, 刷新页面是观察者
      // updateComponent();
      new Wacther(vm, updateComponent, () => {
          console.log('渲染页面');
      }, { render: true });
  }
  function lifecycleMixin(Vue) {
      Vue.prototype._update = function (vnode) {
          // 渲染和更新
          const vm = this;
          vm.$el = patch(vm.$el, vnode);
      };
      Vue.prototype.$nextTick = nextTick;
  }

  let arrayMethods = Object.create(Array.prototype);
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
          }
          const { __ob__: observer } = arrInstance;
          if (inserted) {
              observer.observeArray(inserted);
          }
          observer.dep.notify();
      };
  });

  // 对对象的所有属性进行劫持
  class Observer {
      dep;
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
          }
          else {
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
  function observe(data) {
      if (!isObject(data)) {
          return;
      }
      // 如果数据已被观测过,数据会有__ob__属性,指向observer实例
      if (data.__ob__) {
          return data.__ob__;
      }
      return new Observer(data);
  }

  function initState(vm) {
      const { $options } = vm;
      if ($options.data) {
          initData(vm);
      }
      if ($options.computed) ;
      if ($options.watch) ;
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

  function initMixin(Vue) {
      Vue.prototype._init = function (options) {
          const vm = this;
          vm.$options = options;
          // 对数据进行响应式(data,computed)
          initState(vm);
          if (vm.$options.el) {
              vm.$mount(vm.$options.el);
          }
      };
      Vue.prototype.$mount = function (el) {
          const vm = this;
          el = vm.$el = document.querySelector(el);
          // 把模板转换成渲染函数, -> 调用渲染函数产生vnode -> diff 更新虚拟dom -> 产生真实节点,更新
          // 准备好render渲染函数
          if (!vm.$options.render) {
              let template = vm.$options.template;
              if (!template && el) {
                  template = el.outerHTML;
              }
              // 通过template生成渲染函数
              const render = compileToFunction(template);
              vm.$options.render = render;
          }
          // 挂载组件
          mountComponent(vm);
      };
  }

  function createElement(vm, tag, data = {}, children) {
      return vnode(vm, tag, data, data.key, children);
  }
  function createTextElement(vm, text) {
      return vnode(vm, undefined, undefined, undefined, undefined, text);
  }
  function vnode(vm, tag, data = {}, key, children, text) {
      return {
          vm,
          tag,
          key,
          data,
          children,
          text
      };
  }

  function renderMixin(Vue) {
      Vue.prototype._render = function () {
          const vnode = this.$options.render.call(this);
          return vnode;
      };
      // createElement
      Vue.prototype._c = function (tag, data, ...children) {
          return createElement(this, tag, data, children);
      };
      // createTextElement
      Vue.prototype._v = function (text) {
          return createTextElement(this, text);
      };
      // 值
      Vue.prototype._s = function (val) {
          return typeof val === 'object' ? JSON.stringify(val) : val;
      };
  }

  function Vue(options) {
      this._init(options);
  }
  initMixin(Vue);
  renderMixin(Vue);
  lifecycleMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
