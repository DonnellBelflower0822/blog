import React from "react"

interface ChildProps {

}
interface ChildState {

}
class ChildComponent extends React.Component<ChildProps, ChildState>{
    constructor(props: ChildProps) {
        super(props)
        console.log('ChildComponent constructor')
        this.state = {}
    }

    static getDerivedStateFromProps() {
        console.log('ChildComponent getDerivedStateFromProps')
        return {}
    }

    componentDidMount() {
        console.log('ChildComponent componentDidMount')
    }

    componentWillUnMount() {
        console.log('ChildComponent componentWillUnMount')
    }

    shouldComponentUpdate() {
        console.log('ChildComponent shouldComponentUpdate')
        return true
    }

    componentDidUpdate() {
        console.log('ChildComponent componentDidUpdate')
    }

    render() {
        console.log('ChildComponent render')
        return (
            <div>ChildComponent</div>
        )
    }
}

interface AppProps { }
interface AppState { count: number }

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        console.log('App constructor')
        this.state = {
            count: 0
        }
    }

    static getDerivedStateFromProps() {
        console.log('App getDerivedStateFromProps')
        return {}
    }

    // componentWillMount() {
    //     console.log('componentWillMount')
    // }

    componentDidMount() {
        console.log('App componentDidMount')
    }

    shouldComponentUpdate(nextProps: AppProps, nextState: AppState) {
        console.log('App shouldComponentUpdate', this.state.count, nextState.count)
        return true
    }

    // componentWillUpdate() {
    //     console.log('componentWillUpdate')
    // }

    componentDidUpdate() {
        console.log('App componentDidUpdate')
    }

    // handleClick() {
    //     // undefined
    //     console.log(this)
    // }
    handleClick = () => {
        this.setState({ count: this.state.count + 1 }, () => {
            console.log('callback1', this.state.count)  // 3. callback1 1
        })
    }

    render() {
        console.log('App render')
        const { count } = this.state
        return (
            <div>
                <h2>{count}</h2>
                <button onClick={this.handleClick}>+1</button>
                <ChildComponent />
            </div>
        )
    }


}

export default App