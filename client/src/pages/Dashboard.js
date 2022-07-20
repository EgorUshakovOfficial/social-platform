import { StateContext } from '../containers/Provider';
import CurrentPosts from '../components/CurrentPosts'; 
import NewPosts from '../components/NewPosts'; 
import MakePost from '../components/MakePost';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
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
            <div id="posts">
                <MakePost />
                <CurrentPosts />
                <NewPosts />
            </div>
            <Sidebar />
        </div>
    )
}
