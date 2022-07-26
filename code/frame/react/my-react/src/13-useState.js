import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

/**
 * hook
 * 16.8新增的特性
 * 作用: 
 *      可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性
 * 目的:
 *      在组件之间复用状态逻辑很难
 *          renderProps和hoc高阶函数需要改变组件结构
 *          hook的作用: 在无需改变组件结构的情况下复用状态逻辑
 *      复制组件变得难以理解
 *          逻辑分散到各个生命周期
 *          hook的作用: 可以根据业务点进行拆分, 而不是根据生命周期拆分
 *      难以理解的class
 *          理解this
 *          hook的作用: 可以在非class情况下使用react特性
 */
function Child2() {
    const [count2, setCount2] = TinyReact.useState(2)

    return (
        <div>
            <button onClick={() => {
                setCount2(count2 + 1)
            }}>Child2 +1</button>
            <div>{count2}</div>
        </div>
    )
}

function ParentComponent() {
    const [count1, setCount1] = TinyReact.useState(0)
    return (
        <div>
            <section>
                <button
                    onClick={() => {
                        setCount1(count1 + 1)
                    }}
                >
                    count1 +1
                </button>
                <button
                    onClick={() => {
                        setCount1((prevCount) => prevCount + 2)
                    }}
                >
                    count1 +2
                </button>
                <p>{count1}</p>
                <Child2 />
            </section>
        </div>
    )
}

TinyReactDOM.render(<ParentComponent />, document.getElementById('root'))
