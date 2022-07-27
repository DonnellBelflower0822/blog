export const bindActionCreators = (actions, dispatch) => {
    console.log(actions, dispatch)

    return Object.entries(actions).reduce((obj, [key, generateAction]) => {
        return {
            ...obj,
            [key]: (action) => {
                dispatch(generateAction(action))
            }
        }
    }, {})
}