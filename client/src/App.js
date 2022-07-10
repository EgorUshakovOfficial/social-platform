import './styles/globals.css';
import { Provider } from './containers/Provider';  
import Presentational from './components/Presentational'; 
export default function App() {
  return (
      <Provider>
          <Presentational />
      </Provider>
  );
}

