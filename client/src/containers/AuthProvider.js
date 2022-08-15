import { createContext, useEffect, useState} from 'react'; 

const AuthContext = createContext({})

// Auth Provider
const AuthProvider = ({ children }) => {
    const [token, setToken] = useState("")

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
                        setToken(state => null)
                        return
                    }
                    let data = await res.json()
                    setToken(state => data.token)
                })
                .catch(err => console.log(err))
        } else {
            setToken(state => null)
        }
    }, [])


    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }; 