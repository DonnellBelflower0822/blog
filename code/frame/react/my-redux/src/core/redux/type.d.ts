type Action = { type: string, payload?: unknown }

type Reducer<T> = (state: T, action: Action) => T

type Store<T> = {
    getState: () => T,
    dispatch: (action: Action) => void,
    subscribe: (fn: () => void) => () => void
}

type Enhancer<T> = (createStore: CreateStore<T>) => (
    (reducer: Reducer<T>, initialState?: Partial<T>) => Store<T>
)

type CreateStore<T = any> = (reducer: Reducer<T>, initialState?: Partial<T>, enhancer?: Enhancer<T>) => Store<T>