import { useState } from 'react'; 
import { useMutation, useSubscription } from "@apollo/client"; 
import { LIKE_POST } from '../mutations/postMutations';
import { LIKE_SUBSCRIPTION } from '../subscriptions/postSubscription';
import { COMMENT_SUBSCRIPTION } from '../subscriptions/commentSubscription'; 
import { formatTime } from '../utils/formatTime'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faThumbsUp,
    faComment,
    faShare, 
} from '@fortawesome/free-solid-svg-icons';
import PostDropdown from './PostDropdown';
import Comments from './Comments'; 
import CommentForm from './CommentForm'; 

export default function Post({
    user,
    postId,
    authorName,
    createdAt,
    description,
    likes,
    comments }) {

    // State 
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

    return (
        <div className="post" key={postId}>
            <div className="post-header">
                <div className="pic-div">
                    <img
                        className="profile-pic"
                        src={require(`../images/profile-pic.png`)}
                        alt="Picture of user"
                    />
                </div>
                <div className="user-info">
                    <div className="user-name">{authorName}</div>
                    <span className="post-time">{formatTime(createdAt)}</span>
                </div>
                <PostDropdown postId={postId} />
            </div>
            <p className="post-description">
                {description}
            </p>
            <div className="likes-comments">
                <div className="num-likes">
                    <FontAwesomeIcon icon={faThumbsUp} /> {likes.length}
                </div>
                <div className="num-comments">
                    {comments.length} Comments
                </div>
            </div>
            <div className="divider" />
            <div className="reactions-container">
                <button
                    className="reaction"
                    style={{ color: likes.filter(obj => obj.userId === user._id).length ? "blue" : "black" }}
                    onClick={() => likePost(postId)}
                >
                    Like <FontAwesomeIcon icon={faThumbsUp} />
                </button>
                <button className="reaction" onClick={() => setViewComments(true)}>
                    Comment<FontAwesomeIcon icon={faComment} />
                </button>
                <button className="reaction">
                    Share<FontAwesomeIcon icon={faShare} />
                </button>
            </div>

            {viewComments &&
                <>
                    <div className="divider"  />
                    <CommentForm user={user} postId={postId} />
                    <Comments comments={comments} />
                </>
            }

        </div>
    )
}
