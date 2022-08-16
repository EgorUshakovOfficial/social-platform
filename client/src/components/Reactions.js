import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faThumbsUp,
    faComment,
    faShare,
} from '@fortawesome/free-solid-svg-icons';
export default function Reactions({
    likes,
    user,
    postId,
    setViewComments, 
    likePost
}) {
    return (
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
    )
}