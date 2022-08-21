import { useQuery, useSubscription } from '@apollo/client';
import Post from './Post'; 
import Spinner from './Spinner'; 
import { GET_POSTS } from '../queries/postsQuery';

export default function Posts({ user }) {

    const { data, error, loading } = useQuery(GET_POSTS); 

    if (error) { return <p>Error! Something has gone wrong!</p> }

    if (loading) { return <Spinner /> }

    return (
          <>
            {loading === false && data.posts.map(obj => {
                const {
                    _id: postId,
                    author: {
                        name: authorName, 
                        _id: authorId
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
                    authorId={authorId}
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