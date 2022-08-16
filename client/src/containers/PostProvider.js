import { createContext, useState} from 'react'; 

const PostContext = createContext({})

const PostProvider = ({ children }) => {
    const [deletePostId, setDeletePostId] = useState('')
    const [editPostId, setEditPostId] = useState('')
    return (
        <PostContext.Provider
            value={{
                deletePostId,
                editPostId,
                setDeletePostId,
                setEditPostId
            }}
        >
            {children}
        </PostContext.Provider>
    )
}

export { PostContext, PostProvider }; 