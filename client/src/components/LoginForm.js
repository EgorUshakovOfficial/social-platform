import useLocalStrategy from '../hooks/useLocalStrategy'; 
export default function LoginForm() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        error,
        setError,
        success,
        setSuccess,
        handleSubmit
    } = useLocalStrategy()

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