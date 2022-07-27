import React from 'react'
import { useDispatch, useSelector } from './react-redux'
import { ADD2, MINUS2 } from './store/action-type'

function Counter2() {
    const dispatch = useDispatch()
    const { count } = useSelector(state => state.count2)

    return (
        <div>
            <h2>Counter2 - {count}</h2>
            <button
                onClick={() => {
                    // dispatch({ type: ADD2 })
                    dispatch(new Promise(resolve => {
                        resolve(
                            () => {
                                setTimeout(() => {
                                    dispatch({ type: ADD2 })
                                })
                            }
                        )
                    }))
                }}
            >+1</button>
            <button
                onClick={() => {
                    dispatch({ type: MINUS2 })
                }}
            >-1</button>
        </div>
    )
}
export default Counter2