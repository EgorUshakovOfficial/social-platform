import { StateContext } from '../containers/Provider';
import CreatePost from '../components/CreatePost';
import { useContext } from 'react';
export default function Dashboard() {
    // Handle click 
    const [_, setState] = useContext(StateContext)

    const handleLogout = () => {
        fetch("http://localhost:5000/logout", {
            method: "POST", 
            credentials: "include"
        })
        .then(async res => {
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    return (
        <div id="dashboard">
            <div id="posts">
                <CreatePost />
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
