import { StateContext } from '../containers/Provider';
import MakePost from '../components/MakePost';
import Header from '../components/Header'; 
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
            <Header />
            <div className="nav">
                <h1>Hello world</h1>
            </div>
            <div id="posts">
                <MakePost />
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}
