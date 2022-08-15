import { useContext } from 'react'; 
import { AuthContext } from './AuthProvider';
import Home from '../pages/Home';  
export default function Protected({children}) {
    // State
    const {token} = useContext(AuthContext)  

    if (token === null) {
        return <Home />
    }
    return<>{ children }</>
}