import React from 'react'

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  // 会作为类的原型属性()
  handleClick() {
    console.log('handleClick')
  }

  // 会作为类的实例属性(多次使用该组件会重复创建相同的函数)
  handleClick2 = () => {
    console.log('handleClick2')
  }

  render() {
    return (
      <button
        onDoubleClick={(e) => {
          // 内联函数,每次render都会创建新的
          console.log('内联函数')
        }}
        onClick={this.handleClick}
      >按钮</button>
    )
  }
}

export default App