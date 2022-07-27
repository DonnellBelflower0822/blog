import { useContext } from "react"
import ProviderContext from '../ProviderContext'

export const useDispatch = () => {
    const { store } = useContext(ProviderContext)
    return store.dispatch
}