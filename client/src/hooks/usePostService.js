import { useState } from 'react';
import { useMutation, useSubscription } from '@apollo/client'; 
import { CREATE_POST } from '../mutations/postMutations';
import { GET_POSTS } from '../queries/postsQuery';
import { POST_SUBSCRIPTION } from '../subscriptions/postSubscription';
export default function usePostService({userId }) {
    // State 
    const [description, setDescription] = useState('')

    // Mutation for creating posts
    const [createPost] = useMutation(CREATE_POST, {
        variables: {
            description
        }
    })

    // Post subscription 
    useSubscription(POST_SUBSCRIPTION, {
        variables: {
            userId
        },
        onSubscriptionData: ({ client, subscriptionData }) => {
            console.log(client.readQuery({ query: GET_POSTS }))
            // Previous cache of posts 
            let { posts } = client.readQuery({ query: GET_POSTS })

            // New post 
            let newPost = subscriptionData.data.newPost

            // Updated cache of posts
            client.writeQuery({
                query: GET_POSTS,
                data: { posts: [...posts, newPost] }
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