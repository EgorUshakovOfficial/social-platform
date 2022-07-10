import { StateContext } from '../containers/Provider'; 
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Dashboard() {
    // Handle click 
    const [_, setState] = useContext(StateContext)

    // Navigate 
    const navigate = useNavigate()

    const handleLogout = () => {
        fetch("http://localhost:5000/logout", {
            method: "POST", 
            credentials: "include"
        })
        .then(async res => {
            setState(state => ({ ...state, token: "" }))
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    return (
        <div id="dashboard">
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
