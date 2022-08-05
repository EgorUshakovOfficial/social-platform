import { createContext, useState } from 'react'; 

const StateContext = createContext([{}, () => { }])

let initialState = {
    token: "",
    dropdown: "",
    loading: false
}

const Provider = ({ children }) => {
    const [state, setState] = useState(initialState)
    return (
        <StateContext.Provider value={[state, setState]}>
            {children}
        </StateContext.Provider>
    )
}

export {StateContext, Provider}
