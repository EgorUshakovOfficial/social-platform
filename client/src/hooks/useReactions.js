import { useState } from 'react'; 
import { useMutation, useSubscription } from '@apollo/client';
import { LIKE_POST } from '../mutations/postMutations';
import { LIKE_SUBSCRIPTION } from '../subscriptions/postSubscription';
import { COMMENT_SUBSCRIPTION } from '../subscriptions/commentSubscription';
export default function useReactions(postId) {
    const [viewComments, setViewComments] = useState(false)

    // Like mutation
    const [likePost] = useMutation(LIKE_POST, {
        variables: {
            postId
        }
    })

    // Like subscription 
    useSubscription(LIKE_SUBSCRIPTION)

    // Comment subscription
    useSubscription(COMMENT_SUBSCRIPTION)

    return {
        likePost, 
        viewComments, 
        setViewComments
    }
}