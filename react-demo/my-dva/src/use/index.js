import React from 'react';
import dva from '../dva'
import App from './App'

const app = dva()
app.model({
  namespace: 'counter',
  state: { count: 0 },
  reducers: {
    add(state) {
      return { ...state, count: state.count + 1 }
    }
  },
  effects: {
    /**
     * 
     * @param {*} action 动作
     * @param {*} effects saga/effects
     */
    *asyncAdd(action, { call, put }) {
      yield call(delay, 1000)
      yield put({ type: 'add' })
    }
  }
})

app.router(() => <App />)

app.start('#root')

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}