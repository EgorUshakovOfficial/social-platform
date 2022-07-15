import './styles/globals.css';
import { Provider } from './containers/Provider';  
import Presentational from './components/Presentational';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'; 
const client = new ApolloClient({
    uri: "http://localhost:5000", 
    cache: new InMemoryCache()
})

export default function App() {
    return (
        <Provider>
            <Presentational />
        </Provider>
  );
}

