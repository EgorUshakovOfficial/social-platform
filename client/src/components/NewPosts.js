import { useState } from 'react'; 
import { useSubscription } from '@apollo/client'; 
import { POST_SUBSCRIPTION } from '../subscriptions/postSubscription'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faThumbsUp,
    faComment,
    faShare
} from '@fortawesome/free-solid-svg-icons';
import Post from './Post'; 

export default function NewPosts({ user }) {
    // State 
    const [newPosts, setNewPosts] = useState([])

    // Subscription
    const { data, loading } = useSubscription(POST_SUBSCRIPTION, {
        variables: {
            userId: user._id
        }, 
        onSubscriptionData: res => {
            setNewPosts(prevState => [...prevState, res.subscriptionData.data.newPost])
        }
    })

    return (
        <>
            {newPosts.map(obj => {
                const {
                    _id: postId,
                    author: {
                        name: authorName
                    }, 
                    description, 
                    createdAt, 
                    likes, 
                    comments
                } = obj 
                return (<Post
                    user={user}
                    postId={postId}
                    authorName={authorName}
                    description={description}
                    createdAt={createdAt}
                    likes={likes}
                    comments={comments}
                />)
            })}
        </>
    )
}