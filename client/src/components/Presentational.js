import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { getClient } from '../utils/getClient';
import {AuthContext } from '../containers/AuthProvider';
import { useContext } from 'react'; 
/*import {useEffect, useContext} from 'react';*/
/*import { StateContext } from '../containers/Provider'; */
import Protected from '../containers/Protected';
import Dashboard from '../pages/Dashboard';
import Spinner from './Spinner'; 


export default function Presentational() {
    // Token
    const { token } = useContext(AuthContext)

    return (
        <>
            {
              token === "" ? 
                <Spinner />
                :
                <ApolloProvider client={getClient(token)}>
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
