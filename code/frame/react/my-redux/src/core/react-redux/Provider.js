import React from "react";
import ReactReduxContext from './ProviderContext'

function Provider(props) {
    const value = React.useMemo(() => ({ store: props.store }), [props.store])
    return (
        <ReactReduxContext.Provider value={value}>
            {props.children}
        </ReactReduxContext.Provider>
    )
}

export default Provider