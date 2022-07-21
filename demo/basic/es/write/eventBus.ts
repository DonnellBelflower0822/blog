type Listener = (...args: any[]) => void

class EventBus {
    private _listeners: Map<string, Set<Listener>>
    constructor() {
        this._listeners = new Map()
    }

    on(type: string, listener: Listener) {
        const set = this._listeners.get(type) || new Set()
        set.add(listener)
        this._listeners.set(type, set)
    }

    emit(type: string, ...args: any[]) {
        const listeners = this._listeners.get(type)
        listeners?.forEach(listener => {
            listener.apply(this, args)
        })
    }

    remove(type: string, listener?: Listener) {
        if (listener) {
            this._listeners.delete(type)
        } else {
            const listeners = this._listeners.get(type)
            if (listeners) {
                listeners.delete(listener!)
                this._listeners.set(type, listeners)
            }
        }
    }
}