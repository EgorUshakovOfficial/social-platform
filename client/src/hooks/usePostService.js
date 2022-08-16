import { useState } from 'react'; 
import { useMutation } from '@apollo/client'; 
import { CREATE_POST } from '../mutations/postMutations';
import { GET_POSTS } from '../queries/postsQuery';
export default function usePostService() {
    // State 
    const [description, setDescription] = useState('')

    // Mutation for creating posts
    const [createPost] = useMutation(CREATE_POST, {
        variables: {
            description
        },
        update(cache, { data: { createPost: { post } } }) {
            const { posts } = cache.readQuery({ query: GET_POSTS })
            cache.writeQuery({
                query: GET_POSTS,
                data: { posts: [...posts, post] }
            })
        }
    })

    const onSubmit = e => {
        // Prevent form from being submitted to server 
        e.preventDefault()
        createPost(description)
        setDescription('')
    }

    return {
        onSubmit,
        description, 
        setDescription
    }
}