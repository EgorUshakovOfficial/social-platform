import { useContext } from 'react'; 
import { StateContext } from './Provider';
import Home from '../pages/Home';  
export default function Protected({children}) {
    // State
    const [state, _] = useContext(StateContext)  

    if (state.token === null) {
        return <Home />
    }
    return<>{ children }</>
}