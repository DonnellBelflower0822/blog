import React from "react";
import ProviderContext from '../ProviderContext'

export const useStore = () => {
    const { store } = React.useContext(ProviderContext)
    return store
}

export const useSelector = (selector) => {
    const store = useStore()

    const state = store.getState()
    const selectedState = React.useMemo(() => selector(state), [state])

    const [_, forceUpdate] = React.useReducer((x) => x + 1, 0)

    React.useEffect(() => {
        return store.subscribe(forceUpdate)
    }, [])

    return selectedState
}