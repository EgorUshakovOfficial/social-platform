import { useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { StateContext } from '../containers/Provider'; 
export default function LoginForm() {
    // State
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [state, setState] = useContext(StateContext)

    // Navigate 
    const navigate = useNavigate()

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
            const { token } = data
            setState(state => {
                state.token = token
                return {...state}
            })
        })
        .catch(err => {
            setError("Error! Something went wrong!")
        })
    }


    return (
        <div id="login-div" onSubmit={handleSubmit}>
            <form id="login-form">
                {error && <div className="row">
                    <div className="alert alert-danger alert-dismissible">
                        <button type="button" className="btn-close" onClick={() => setError("")} />
                        {error}
                    </div>
                </div>}
                {success && <div className="row">
                    <div className="alert alert-success alert-dismissible">
                        <button type="button" className="btn-close" onClick={() => setSuccess("")}/>
                        {success}
                    </div>
                </div>}
                <div className="row">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={e => setEmail(
                            e.target.value
                        )}
                        value={email}
                    />
                </div>
                <div className="row">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={e => setPassword(
                            e.target.value
                        )}
                        value={password}
                    />
                </div>
                <div className="row">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            <div className="row" id="forgot-div">
                <a href="#" id="forgot-link">Forgot Password?</a>
            </div>
            <div className="divider" />
            <div className="row" id="create-account-div">
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#loginModal">Create new account</button>
            </div>
        </div>
    )
}