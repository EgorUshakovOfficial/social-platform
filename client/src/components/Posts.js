
import { GET_POSTS } from '../queries/postsQuery';
import { POST_SUBSCRIPTION } from '../subscriptions/postSubscription'; 
import { useQuery} from '@apollo/client';
import Post from './Post'; 
import Spinner from './Spinner'; 

export default function Posts({user}) {
    const { data, error, loading, subscribeToMore } = useQuery(GET_POSTS); 

    if (error) { return <p>Error! Something has gone wrong!</p> }

    if (loading) { return <Spinner /> }

    subscribeToMore({
        document: POST_SUBSCRIPTION, 
        variables: { userId: user._id }, 
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev; 
            const newPost = subscriptionData.data.newPost
            return Object.assign({}, {posts: [...prev.posts, newPost]})
        }
    })

    return (
          <>
            {loading === false && data.posts.map(obj => {
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
                    key={postId}
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