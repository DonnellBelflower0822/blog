const createContext = (initailValue) => {
    Provider._value = initailValue

    // 提供
    function Provider(props) {
        if (!Provider._value) {
            Provider._value = {}
        }
        Provider._value = Object.assign(Provider._value, props.value)

        return props.children
    }

    // 消费
    function Consumer(props) {
        return props.children(Provider._value)
    }

    return {
        Provider,
        Consumer
    }
}

export default createContext
