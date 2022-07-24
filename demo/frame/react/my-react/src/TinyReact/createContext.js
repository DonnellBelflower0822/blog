const createContext = (initailValue) => {
    Provider._value = initailValue

    function Provider(props) {
        if (!Provider._value) {
            Provider._value = {}
        }
        Provider._value = Object.assign(Provider._value, props.value)

        return props.children
    }


    function Consumer(props) {
        return props.children(Provider._value)
    }

    return {
        Provider,
        Consumer
    }
}

export default createContext
