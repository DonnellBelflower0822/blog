import React from "react"

interface AppProps { }
interface AppState { count: number }

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = {
            count: 0
        }
    }

    // handleClick() {
    //     // undefined
    //     console.log(this)
    // }
    handleClick = () => {
        this.setState({ count: this.state.count + 1 }, () => {
            console.log('callback1', this.state.count)  // 3. callback1 1
        })
        console.log(this.state.count)   // 1. 0
        this.setState({ count: this.state.count + 1 }, () => {
            console.log('callback2', this.state.count)  // 4. callback1 1
        })
        console.log(this.state.count)   // 2. 0
        Promise.resolve().then(() => {
            console.log(this.state.count)   // 5. 1
            this.setState({ count: this.state.count + 1 }, () => {
                console.log('callback3', this.state.count)  // 6. callback3 2
            })
            console.log(this.state.count)   // 7. 2
            this.setState({ count: this.state.count + 1 }, () => {
                console.log('callback4', this.state.count)  // 8. callback 3
            })
            console.log(this.state.count)   // 9. 3
        })
    }

    render() {
        const { count } = this.state
        return (
            <div>
                <h2>{count}</h2>
                <button onClick={this.handleClick}>+1</button>
            </div>
        )
    }


}

export default App