import { useState} from 'react'; 
export default function RegistrationForm() {
    // State 
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = e => {
        e.preventDefault()

        // Register user using register API endpoint
        fetch("http://localhost:5000/register", {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST", 
            body: JSON.stringify({
                name, 
                email, 
                password
            })
        })
        .then(async res => {
            let data = await res.json()
            if (res.status === 401) {
                setError(data.message)
            }
            setSuccess(data.message)
        })
        .catch(err => { 
            setError("Error! Something went wrong!")
        })

        // Clear text in input fields 
        setName('')
        setEmail('')
        setPassword('')
    }

    return (
        <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <form className="modal-content" onSubmit={handleSubmit}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="loginModalLabel">Sign up</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ width: "90%", marginInline: "auto" }}>
                        {error && <div className="row">
                            <div className="alert alert-danger alert-dismissible">
                                <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                                {error}
                            </div>
                        </div>}
                        {success && <div className="row">
                            <div className="alert alert-success alert-dismissible">
                                <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                                {success}
                            </div>
                        </div>}
                        <div className="row">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Name"
                                onChange={e => setName(e.target.value)}
                                value={name}
                                required
                            />
                        </div>
                        <div className="row">
                            <input
                                className="form-control"
                                type="email"
                                placeholder="Email"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>
                        <div className="row">
                            <input
                                className="form-control"
                                type="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" class="btn btn-success">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
