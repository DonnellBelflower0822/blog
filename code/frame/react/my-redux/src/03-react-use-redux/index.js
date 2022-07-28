import React from "react";
import { createRoot } from "react-dom/client";
import store from './store'
import { Provider } from "../core/react-redux";
import Counter1 from "./Counter1";
import Counter2 from "./Counter2";

const root = createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <Counter1 />
        <Counter2 />
    </Provider>
)

