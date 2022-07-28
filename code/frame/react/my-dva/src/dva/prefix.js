export function prefixedNamespace(model) {
    if (model.reducers) {
        model.reducers = prefix(model.reducers, model.namespace)
    }
    if (model.effects) {
        model.effects = prefix(model.effects, model.namespace)
    }

    return model
}

function prefix(obj, namespace) {
    return Object.entries(obj).reduce((memo, [key, value]) => ({
        ...memo,
        [`${namespace}/${key}`]: value
    }), {})
}