import './styles/globals.css';
import { AuthProvider } from './containers/AuthProvider';  
import Presentational from './components/Presentational';

export default function App() {
    return (
        <AuthProvider>
            <Presentational />
        </AuthProvider>
  );
}

