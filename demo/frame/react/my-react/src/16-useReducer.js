import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

function reducer(state, action) {
    switch (action.type) {
        case 'changeName':
            return { ...state, name: action.payload }
        case 'changeAge':
            return { ...state, age: action.payload }
        default:
            return { ...state }
    }
}

function ParentComponent() {
    const [men, dispatch] = TinyReact.useReducer(reducer, {
        name: 'allen',
        age: 27
    })

    return (
        <div>
            <section>
                <button
                    onClick={() => {
                        dispatch({
                            type: 'changeName',
                            payload: 'jack'
                        })
                    }}
                >
                    改变姓名
                </button>
                <button
                    onClick={() => {
                        dispatch({
                            type: 'changeAge',
                            payload: 32
                        })
                    }}
                >
                    改变年龄
                </button>
                <p>姓名 - {men.name}</p>
                <p>年龄 - {men.age}</p>
            </section>
        </div>
    )
}

TinyReactDOM.render(<ParentComponent />, document.getElementById('root'))
