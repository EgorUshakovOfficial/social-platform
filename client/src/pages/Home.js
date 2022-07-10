import CompanyTitle from '../components/CompanyTitle';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm'; 
export default function Home() {
    return (
        <div id="home">
            <CompanyTitle />
            <LoginForm />
            <RegistrationForm />
        </div>
    )
}
