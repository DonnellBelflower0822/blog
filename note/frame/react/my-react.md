# 手写react

**仓库地址: https://github.com/xuxiaozhou/custom-react**

> 食用指南

```shell
git clone https://github.com/xuxiaozhou/custom-react
yarn
# 构建出react,react-router-dom,react-redux
yarn build
# 示例代码: custom-react-demo
```

## React/ReactDOM

### React.createElement

> 将jsx转成虚拟DOM

```ts
export function createElement(type, props: Props = {}, ...children): ReactNode {
  const { key, ref, ...extProps } = props || {};
  const reactNode: ReactNode = {
    type,
    ref,
    props: {
      ...extProps,
    }
  };

  /**
   * createElement('div',{},'hello')
   * createElement('div',{},createElement('div',{},))
   * createElement('div',{},createElement('div',{},),createElement('div',{}))
   * createElement('div',{},[createElement('div',{},),createElement('div',{})])
   */
  if (children.length === 1) {
    if (children[0] !== undefined) {
      reactNode.props.children = wrapChildren(children[0]);
    }
  } else {
    reactNode.props.children = children.map(wrapChildren);
  }

  return reactNode;
}
```

### 挂载过程
- 根据虚拟节点创建真实dom(createDOM)
  - 是DOM元素
    - 创建DOM元素
    - 处理属性
    - 处理children
  - 是函数组件
    - 调用函数返回真正渲染的虚拟节点
    - 记录上一次真正渲染的虚拟节点
    - 调用createDOM
  - 是类组件(.isReactComponent为true)
    - 创建实例
    - 调用实例的render方法返回真正渲染的虚拟节点
    - 记录上一次真正渲染的虚拟节点
    - 调用createDOM

<img src='./img/mount.png' />

### 合成事件SyntheticEvent
- 将事件挂载到document
- 通过事件的target
  - 找到真正触发事件的DOM元素
  - 找到事件方法
- 找到DOM元素身上存储store。找到事件处理函数
- 通过递归target.parentNode实现事件冒泡
- 合成事件
  - 浏览器的原生事件的跨浏览器包装器(处理兼容)
  - 提供浏览器原生事件相同接口
  - 可以进行额外处理

```ts
export function addEvent(dom: DOM, type: string, listener: () => void) {
  // 将事件处理放到dom身上
  const store = dom.store || (dom.store = {});
  store[type] = listener;

  // 将事件挂载到document身上
  if (!document[type]) {
    document[type] = dispatchEvent;
  }
}

// 事件触发都用此方法
function dispatchEvent(e) {
  // 进入批量更新模式
  updateQueue.isBatchingUpdate = true;

  const { type } = e;
  let { target } = e;
  const eventType = `on${type}`;

  createSyntheticEvent(e);

  // 通过事件源递归向上找，模拟事件冒泡
  while (target) {
    const { store } = target;
    if (store?.[eventType]) {
      // 原生事件的this为undefined
      const listener = store[eventType];
      listener(syntheticEvent);
    }

    target = target.parentNode;
  }

  resetSyntheticEvent();

  // 最后:批量执行一次
  updateQueue.batchUpdate();
}
```

### Component

- 类组件的基类
- setState会两种模式
  - 批量更新模式:
    - 不会立即执行,会最后一次执行
    - 在类组件的生命周期,事件处理会走批量更新模式
  - 非批量更新模式
    - 会立即执行.
    - 例如:在事件处理函数里执行setTimeout的会调用setState就是立即执行

```ts
// 更新队列, 
export const updateQueue = {
  // 当前更新模式
  isBatchingUpdate: false,
  // 更新实例
  updaters: new Set<Updater>(),
  // 执行更新
  batchUpdate() {
    for (const updater of this.updaters) {
      updater.updateClassComponent();
    }
    this.isBatchingUpdate = false;
    this.updaters.length = 0;
  }
};

class Updater<P = object, S = object> {
  constructor(instance: Component<P, S>) {
    this.instance = instance;
    this.pendingState = [];
    this.callbacks = [];
  }

  addState(partialState: PartialState<S, P>, callback: SetStateCallback) {
    // 将参数添加到实例上
    this.pendingState.push(partialState);
    if (callback) {
      this.callbacks.push(callback);
    }
    // 尝试更新
    this.emitUpdate();
  }

  emitUpdate(newProps?: P) {
    this.newProps = newProps;
    if (updateQueue.isBatchingUpdate) {
      // 批量更新模式
      // 往更新队列里面增加当前更新
      updateQueue.updaters.add(this as any as Updater<object, object>);
    } else {
      // 不是批量更新模式，直接更新
      this.updateClassComponent();
    }
  }

  // 获取最新的state
  getState() {
    const { instance, pendingState } = this;

    let { state, props } = instance;
    pendingState.forEach(nextState => {
      // 处理setState传递函数的情况
      if (typeof nextState === 'function') {
        nextState = nextState.call(instance, state, props);
      }

      state = {
        ...state,
        ...nextState
      };
    });

    pendingState.length = 0;
    return state;
  }

  updateClassComponent() {
    const { instance, pendingState, newProps, callbacks } = this;
    if (newProps || pendingState.length > 0) {
      shouldUpdate<P, S>(instance, newProps, this.getState(), callbacks);
    }
  }
}

// 不管组件是否要更新，props和state都要更新
function shouldUpdate<P, S>(instance: Component<P, S>, newProps: P, nextState: S, callbacks: SetStateCallback[]) {
  // getDerivedStateFromProps
  const { getDerivedStateFromProps } = instance.ownReactNode.type;
  if (getDerivedStateFromProps) {
    const partialState = getDerivedStateFromProps(newProps, instance.state);
    nextState = {
      ...nextState,
      ...partialState,
    };
  }

  // 设置最新的state
  instance.state = nextState;

  // shouldComponentUpdate(组件是否要更新)
  // 返回false，则不需要更新
  // 返回true, 则需要更新
  if (instance.shouldComponentUpdate && !instance.shouldComponentUpdate(newProps, nextState)) {
    return;
  }

  if (newProps) {
    instance.props = newProps;
  }

  // 更新组件
  instance.forceUpdate();

  callbacks.forEach(cb => {
    cb();
  });

  callbacks.length = 0;
}

export class Component<P = object, S = object> {
  // ...其他属性

  constructor(props: P) {
    this.props = props;
    this.updater = new Updater<P, S>(this);
  }

  setState(partialState: PartialState<S, P>, callback?: SetStateCallback) {
    this.updater.addState(partialState, callback);
  }

  forceUpdate() {
    // 走render
    const renderReactNode = (this as any as typeof Component & { render: () => ReactNode; }).render();
    // 走getSnapshotBeforeUpdate, 返回值作为componentDidUpdate的第三个参数
    const extrArgs = this.getSnapshotBeforeUpdate?.();
      
    const oldDom = findDOM(this.lastRenderReactNode);

    // 比较新旧虚拟节点.走dom-diff
    compareTwoVDom(
      oldDom ? oldDom.parentNode : null,
      this.lastRenderReactNode,
      renderReactNode
    );

    this.lastRenderReactNode = renderReactNode;
    // 走componentDidUpdate
    this.componentDidUpdate?.(prevProps, prevState, extrArgs);
  }
}
```

### React.PureComponent

- 主要实现shouldComponentUpdate对新旧props和新旧state进行浅层比较

```ts
export class PureComponent extends Component {
  // 组件是否要更新
  // 返回true,  则需要更新
  // 返回false, 则不需要更新
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }
}
```

### React.memo

- 为函数组件提供类组件shouldComponentUpdate的功能
- 如果 props 相等，areEqual 会返回 true；如果 props 不相等，则返回 false

```ts
export function memo(FunctionComponent, compare?: (prevProps, nextProps) => boolean) {
  if (compare) {
    return class extends Component {
      shouldComponentUpdate(nextProps) {
        return !compare(this.props, nextProps);
      }
      render() {
        return FunctionComponent(this.props);
      }
    };
  }

  return class extends PureComponent {
    render() {
      return FunctionComponent(this.props);
    }
  };
}
```

### dom-diff
> compareTwoVDom

- 处理单节点
  - 新旧为null
  - 新的为null,旧的不为null: 走unmount(卸载)
  - 新的不为null,旧的为null: 走mount(挂载)
  - 新旧节点type和key不一样: 卸载老的,挂载新的
  - 处理同为文本节点
- 处理多节点

```ts
export function compareTwoVDom(parentDOM: HTMLElement, oldReactNode: ReactNode, newReactNode: ReactNode, nextDOM?: HTMLElement) {
  // 新旧节点都为null
  if (!newReactNode && !oldReactNode) {
    return;
  }

  // 新的为null，旧的不为null
  if (!newReactNode && oldReactNode) {
    const oldDom = findDOM(oldReactNode);

    if (oldDom) {
      parentDOM.removeChild(oldDom);
    }

    return;
  }

  // 老的为null，新的不为null
  if (!oldReactNode && newReactNode) {
    const newDOM = createDOM(newReactNode);

    parentDOM.insertBefore(newDOM, nextDOM || null);

    return;
  }

  // 新旧都有，但类型不一样
  if (oldReactNode.type !== newReactNode.type) {
    const oldDom = findDOM(oldReactNode);
    const newDOM = createDOM(newReactNode);

    parentDOM.replaceChild(newDOM, oldDom);
    return;
  }

  updateElement(oldReactNode, newReactNode);
}

function updateElement(oldReactNode: ReactNode, newReactNode: ReactNode) {
  const { type } = oldReactNode;
  // 文本
  if (type === TEXT) {
    const currentDOM = newReactNode.dom = oldReactNode.dom;
    currentDOM.textContent = newReactNode.props.content;
    return;
  }

  // 元素
  if (typeof type === 'string') {
    const currentDOM = newReactNode.dom = oldReactNode.dom;
    // 更新属性
    updateProps(currentDOM as HTMLElement, newReactNode.props, oldReactNode.props);

    updateChildren(currentDOM, oldReactNode.props.children, newReactNode.props.children);
    return;
  }

  if ((type as any as Component).isReactComponent) {
    updateClassComponent(oldReactNode, newReactNode);
  } else {
    updateFunctionComponent(oldReactNode, newReactNode as FunctionReactNode);
  }
}

function updateClassComponent(oldReactNode: ReactNode, newReactNode: ReactNode) {
  const instance = newReactNode.instance = oldReactNode.instance;

  instance.updater.emitUpdate(newReactNode.props);
}
function updateFunctionComponent(oldReactNode: ReactNode, newReactNode: FunctionReactNode) {
  const parentDOM = findDOM(oldReactNode).parentNode;
  const { type, props } = newReactNode;
  let lastRenderReactNode = oldReactNode.lastRenderReactNode;
  const newRenderReactNode = type(props);
  compareTwoVDom(parentDOM, lastRenderReactNode, newRenderReactNode);
  newReactNode.lastRenderReactNode = newRenderReactNode;
}

function getArray<T>(item: T | T[]): T[] {
  return Array.isArray(item) ? item : [item];
}

function updateChildren(parentDOM: DOM, oldReactNodeChildren: ReactNode | ReactNode[], newReactNodeChildren: ReactNode | ReactNode[]) {
  oldReactNodeChildren = getArray<ReactNode>(oldReactNodeChildren);
  newReactNodeChildren = getArray<ReactNode>(newReactNodeChildren);

  const maxLength = Math.max(oldReactNodeChildren.length, newReactNodeChildren.length);
  for (let i = 0; i < maxLength; i++) {
    const nextDOM = oldReactNodeChildren.find((item, index) => index > i && item && item.dom);
    compareTwoVDom(parentDOM as HTMLElement, oldReactNodeChildren[i], newReactNodeChildren[i], (nextDOM && nextDOM.dom) as HTMLElement);
  }
}
```

### Context
> Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

```ts
export function createContext(initialValue?: unknown) {
  Provider._value = initialValue;

  function Provider(props) {
    // 让对象指向不变
    if (!Provider._value) {
      Provider._value = {};
    }
    Provider._value = Object.assign(Provider._value, props.value);

    return props.children;
  }

  function Consumer(props) {
    return props.children(Provider._value);
  }

  return {
    Consumer,
    Provider,
  };
}

// 挂载类组件
function mountClassComponent(reactNode: ClassReactNode) {
  // 判断类组件是否有contextType静态方法
  if (Type.contextType) {
    // 为其实例context赋值
    // 由于在更新时没有改到这个的引用地址,下次渲染还是能获取最新的值
    instance.context = Type.contextType.Provider._value;
  }
}
```

**使用**
```jsx
const MyContext = React.createContext()

// 提供
<MyContext.Provider value={{...context}}>
  {...other}
</MyContext.Provider>  

// 消费：类组件
class Eye extends CustomReact.Component {
  static contextType = MyContext
  render(){
    console.log(this.context)
  }
}

// 消费: 函数组件
<MyContext.Consumer>
  {(props)=><Sub {...props}/>}
</MyContext.Consumer>
```

### ref
> Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。

```ts
export function createRef() {
  return { current: null };
}

function mountClassComponent(reactNode: ClassReactNode) {
  // <Com ref={ref}>
  if (reactNode.ref) {
    reactNode.ref.current = instance;
  }
}

function createDOM(reactNode: ReactNode): DOM {
  const { ref } = reactNode;

  // ref赋值真实dom
  if (ref) {
    ref.current = dom;
  }

  return dom;
}
```





