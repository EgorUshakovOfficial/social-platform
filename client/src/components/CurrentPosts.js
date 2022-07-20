import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faThumbsUp,
    faComment, 
    faShare
} from '@fortawesome/free-solid-svg-icons';
import {useContext} from 'react'; 
import { StateContext } from '../containers/Provider'; 
import { GET_POSTS } from '../queries/postsQuery';
import { useQuery, useSubscription} from '@apollo/client'; 
import Spinner from './Spinner'; 
export default function CurrentPosts() {
    const [state] = useContext(StateContext); 
    const { data, error, loading } = useQuery(GET_POSTS, {
        context: {
            headers: {
                authorization: `bearer ${state.token}`
            }
        }
    }); 

    if (loading) { return <Spinner /> }

    if (error) {return <p>Error! Something has gone wrong!</p>}
    return (
          <>
            {data.posts.map(obj => {
                return (<div className="post" key={obj._id}>
                    <div className="user-container">
                       <div className="pic-div">
                            <img
                                className="profile-pic"
                                src={require(`../images/profile-pic.png`)}
                                alt="Picture of user"
                            />
                        </div>
                        <div className="user-info">
                            <div className="user-name">{obj.author.name}</div>
                            <span className="post-time">{obj.createdAt}</span>
                        </div>
                    </div>
                    <p className="post-description">
                        {obj.description}
                    </p>
                    <div className="likes-comments">
                        <div className="num-likes">
                            <FontAwesomeIcon icon={faThumbsUp} /> {obj.numLikes}
                        </div>
                        <div className="num-comments">
                            {obj.numComments} Comments 
                        </div>
                    </div>
                    <div className="divider" />
                    <div className="reactions-container">
                        <button className="reaction">
                            Like <FontAwesomeIcon icon={faThumbsUp} />
                        </button>
                        <button className="reaction">
                            Comment<FontAwesomeIcon icon={faComment} />
                        </button>
                        <button className="reaction">
                            Share<FontAwesomeIcon icon={faShare} />
                        </button>
                    </div>
                </div>)
            })}
        </>
    )
}