type FunctionComponent<T = any> = (props: T) => VDOM
interface VDOM {
    type: string | TinyReact.Component | TinyReact.PureComponent | FunctionComponent
    props: any
}

interface Fiber {
    stateNode?: HTMLElement | TinyReact.Component | TinyReact.PureComponent
    // Root根 Host原生元素 Text文本 Class类组件, Function函数组件
    tag: Symbol,
    props: VDOM['props'],

    return: Fiber,
    child: Fiber
    slibing: Fiber

    updateQueue: UpdateQueue,
    // PLACEMENT新增
    // UPDATE更新
    // DELETION删除
    effectTag: Symbol,

    nextEffect?: Fiber,
    lastEffect?: Fiber,
    nextEffect?: Fiber


}