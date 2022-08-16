import { createContext, useState} from 'react'; 

const DashboardContext = PostContext({})

const DashboardProvider = ({ children }) => {
    const [state, setState] = useState({
        deletePostId: "",
        editPostId: ""
    })
    return (
        <DashboardProvider.Provider value={{state, setState}}>
            {children}
        </DashboardProvider.Provider>
    )
}

export { DashboardContext, DashboardProvider }; 