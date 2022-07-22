import { useState } from 'react'; 
import { useSubscription } from '@apollo/client'; 
import { POST_SUBSCRIPTION } from '../subscriptions/postSubscription'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faThumbsUp,
    faComment,
    faShare
} from '@fortawesome/free-solid-svg-icons';
import {formatTime} from '../utils/formatTime'; 

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
                return (
                    <div className="post" key={obj._id}>
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
                                <span className="post-time">{formatTime(obj.createdAt)}</span>
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
                    </div>
                )
            })}
        </>
    )
}