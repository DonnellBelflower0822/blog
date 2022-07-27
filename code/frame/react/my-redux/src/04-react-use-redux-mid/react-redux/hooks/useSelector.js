import React from "react";
import ProviderContext from '../ProviderContext'

export const useSelector = (selector) => {
    const { store } = React.useContext(ProviderContext)
    return useSelectorWithStore(selector, store)
}

function useSelectorWithStore(selector, store) {
    const state = store.getState()
    const selectedState = selector(state)
    const [_, forceUpdate] = React.useReducer((x) => x + 1, 0)

    React.useEffect(() => {
        return store.subscribe(forceUpdate)
    }, [])

    return selectedState
}