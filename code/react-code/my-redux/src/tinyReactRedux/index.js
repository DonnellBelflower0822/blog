import React from 'react'
import { bindActionCreators } from 'redux'

const ReactReduxContext = React.createContext()

export function Provider(props) {
  const { store } = props
  return (
    <ReactReduxContext.Provider value={store}>
      {props.children}
    </ReactReduxContext.Provider>
  )
}

export const connect = (mapStateToProps, mapDispatchToProps) => {
  return (Com) => {
    return function (props) {
      // 获取store
      const store = React.useContext(ReactReduxContext)
      const state = store.getState()
      // 准备好props数据通过mapStateToProps和mapDispatchToProps
      const stateToProps = mapStateToProps(state)
      const dispatchToProps = React.useMemo(() => {
        if (typeof mapStateToProps === 'object') {
          return bindActionCreators(mapDispatchToProps, store.dispatch)
        }

        if (typeof mapDispatchToProps === 'function') {
          return mapDispatchToProps(store.dispatch)
        }

        return { dispatch: store.dispatch }
      }, [store.dispatch])

      // 订阅, 当更新时刷新组件
      const [, forceupdate] = React.useReducer((x) => x + 1, 0)
      React.useEffect(() => {
        return store.subscribe(forceupdate)
      }, [store])

      return <Com {...props} {...stateToProps} {...dispatchToProps} />
    }
  }
}

export const useDispatch = () => {
  const store = React.useContext(ReactReduxContext)
  return store.dispatch
}

export const useSelector = (mapStateToProps) => {
  const store = React.useContext(ReactReduxContext)
  const state = store.getState()
  const stateToProps = mapStateToProps(state)

  // 订阅, 当更新时刷新组件
  const [, forceupdate] = React.useReducer((x) => x + 1, 0)
  React.useEffect(() => {
    return store.subscribe(forceupdate)
  }, [store])
  
  return stateToProps
}
