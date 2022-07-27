import React, { useContext } from "react"
import { bindActionCreators } from "../redux"
import ProviderContext from './ProviderContext'

// mapStateToProps state=>state.count1
// mapDispatchToProps 

export const connect = (mapStateToProps, mapDispatchToProps) => {
    return (Component) => {
        return function (props) {
            const [_, forceUpdate] = React.useReducer((x) => x + 1, 0)
            const { store } = useContext(ProviderContext)
            const { getState, dispatch } = store

            const prevState = getState()
            const state = React.useMemo(() => mapStateToProps(prevState), [prevState])

            const dispatchProps = React.useMemo(() => {
                return typeof mapDispatchToProps === 'function'
                    ? mapDispatchToProps(dispatch)
                    : (
                        mapDispatchToProps
                            ? bindActionCreators(mapDispatchToProps, store.dispatch)
                            : { dispatch }
                    )
            }, [store])

            React.useLayoutEffect(() => {
                return store.subscribe(forceUpdate)
            }, [store])

            return <Component {...props} {...state} {...dispatchProps} />
        }
    }
}

export const connect1 = (mapStateToProps, mapDispatchToProps) => {
    return (Component) => {
        return class extends React.PureComponent {

            static contextType = ProviderContext

            componentDidMount() {
                this.unsubscribe = this.context.store.subscribe(() => {
                    this.forceUpdate()
                })
            }

            componentWillUnmount() {
                this.unsubscribe?.()
            }

            render() {
                const { getState, dispatch } = this.context.store
                const prevState = getState()
                const state = mapStateToProps(prevState)
                const dispatchProps = typeof mapDispatchToProps === 'function'
                    ? mapDispatchToProps(dispatch)
                    : (
                        mapDispatchToProps
                            ? bindActionCreators(mapDispatchToProps, this.store.dispatch)
                            : { dispatch }
                    )

                return <Component {...this.props} {...state} {...dispatchProps} />
            }
        }
    }
}
