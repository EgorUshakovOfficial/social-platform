import { StateContext } from '../containers/Provider';
import Posts from '../components/Posts'; 
import MakePost from '../components/MakePost';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner'; 
import { useContext } from 'react';
import { useQuery, useApolloClient} from '@apollo/client'; 
import { GET_USER } from '../queries/userQuery';

export default function Dashboard() {
    // State of application 
    const [state, setState] = useContext(StateContext)

    // Apollo client
    const client = useApolloClient()

    const handleLogout = () => {
        fetch("http://localhost:5000/logout", {
            method: "POST", 
            credentials: "include"
        })
        .then(res => {
            client.resetStore()
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    // Retrieve user details
    const { data, loading, error} = useQuery(GET_USER)

    if (loading) return <Spinner />
    if (error) return <p>Error! Something went wrong!</p>
    return (
        <div id="dashboard">
            <Header />
            <div id="posts">
                <MakePost user={data.user} />
                <Posts user={data.user } />
            </div>
            <Sidebar />
        </div>
    )
}
