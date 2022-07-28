export const shallowEqual = (obj1, obj2) => {
    if (obj1 === obj2) {
        if (obj1 === undefined) {
            return false
        }

        return true
    }

    if (typeof obj1 !== typeof obj2) {
        return false
    }

    if (typeof obj1 === 'object' && Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false
    }

    if (Array.isArray(obj1) && obj1.length !== obj2.length) {
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