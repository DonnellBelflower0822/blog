export const toArray = (item) => (
    Array.isArray(item) ? item : [item]
)

export const shallowEqual = (obj1, obj2) => {
    if (obj1 === obj2) {
        return true
    }

    if (typeof obj1 !== typeof obj2) {
        return false
    }

    if (typeof obj1 === 'object' && Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false
    }

    for (let key in obj1) {
        if (key === 'children') {
            continue
        }

        if (obj1[key] !== obj2[key]) {
            return false
        }
    }

    return true
}