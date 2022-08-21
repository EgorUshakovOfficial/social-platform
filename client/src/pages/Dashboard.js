import { StateContext } from '../containers/Provider';
import Posts from '../components/Posts'; 
import MakePost from '../components/MakePost';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';
import EditModal from '../components/EditModal'; 
import CautionModal from '../components/CautionModal'; 
import { useQuery, useApolloClient, useSubscription} from '@apollo/client'; 
import { GET_USER } from '../queries/userQuery';
import { PostProvider } from '../containers/PostProvider';

export default function Dashboard() {
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
    const { data, loading, error } = useQuery(GET_USER)
    if (loading) return <Spinner />
    if (error) return <p>Error! Something went wrong!</p>
    return (
        <div id="dashboard">
            <Header user={data.user} />
            <PostProvider>
                <div id="posts">
                    <MakePost user={data.user} />
                    <Posts user={data.user} />
                    <EditModal />
                    <CautionModal />
                </div>
            </PostProvider>
            <Sidebar />
        </div>
    )
}
