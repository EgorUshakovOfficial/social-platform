import { useState, useContext} from 'react';
import { AuthContext } from '../containers/AuthProvider'; 
export default function useLocalStrategy() {
    // State
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Set token 
    const { setToken } = useContext(AuthContext)

    // Handle submit 
    const handleSubmit = e => {
        e.preventDefault()

        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(async res => {
                if (res.status === 401) {
                    setError("Email or password is incorrect! Please enter valid email and password")
                    return
                }
                let data = await res.json()
                setToken(data.token)
            })
            .catch(err => {
                setError("Error! Something went wrong!")
            })
    }

    return {
        email, 
        setEmail, 
        password, 
        setPassword, 
        error, 
        setError, 
        success, 
        setSuccess, 
        handleSubmit
    }

}