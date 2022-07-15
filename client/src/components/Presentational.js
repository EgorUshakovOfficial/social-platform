import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate
} from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {useEffect, useContext} from 'react';
import { StateContext } from '../containers/Provider'; 
import Protected from '../containers/Protected';
import Dashboard from '../pages/Dashboard';
import Spinner from './Spinner'; 

// Set up Apollo client 
const client = new ApolloClient({
    uri: "http://localhost:5000",
    cache: new InMemoryCache()
}); 


export default function Presentational() {
    // State 
    const [state, setState] = useContext(StateContext)

    let { token } = state

    // Retrieve access token
    useEffect(() => {
        const { cookie } = document
        let isRefreshCookie = /connect\-sid/.test(cookie)
        if (isRefreshCookie && token === "") {
            // Change state of application of loading from not loading to loading 
            fetch("http://localhost:5000/refreshToken", {
                headers: {
                    "Content-type": "application/json"
                },
                method: "POST",
                credentials: "include"
            })
                .then(async res => {
                    if (res.status === 401) {
                        setState(state => ({...state, token: null}))
                        return
                    }
                    let data = await res.json()
                    setState(state => ({...state, token: data.token}))
                })
                .catch(err => console.log(err))
        } else {
            setState(state => ({...state, token: null}))
        }
    }, [])

    return (
        <>
            {
                state.token === "" ? 
                <Spinner />
                :
                <ApolloProvider client={client}>
                    <Router>
                        <Routes>
                            <Route path="/" element={
                                <Protected>
                                    <Dashboard />
                                </Protected>
                            } />
                        </Routes>
                    </Router>
                </ApolloProvider>
            }
        </>
    )
}
