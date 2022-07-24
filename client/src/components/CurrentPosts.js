import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faThumbsUp,
    faComment, 
    faShare
} from '@fortawesome/free-solid-svg-icons';
import {useContext} from 'react'; 
import { StateContext } from '../containers/Provider'; 
import { GET_POSTS } from '../queries/postsQuery';
import { useQuery, useSubscription } from '@apollo/client'; 
import Post from './Post'; 
import Spinner from './Spinner'; 
import {formatTime} from '../utils/formatTime'; 

export default function CurrentPosts({user}) {
    const [state] = useContext(StateContext); 
    const { data, error, loading } = useQuery(GET_POSTS); 

    if (error) {return <p>Error! Something has gone wrong!</p>}
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