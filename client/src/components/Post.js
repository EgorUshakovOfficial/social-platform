
import { formatTime } from '../utils/formatTime'; 
import PostDropdown from './PostDropdown';
import Comments from './Comments'; 
import CommentForm from './CommentForm';
import Reactions from './Reactions';  
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useReactions from '../hooks/useReactions';

export default function Post({
    user,
    postId,
    authorName,
    createdAt,
    description,
    likes,
    comments }) {

    const { viewComments, likePost, setViewComments } = useReactions(postId)

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
            <Reactions
                likes={likes}
                user={user}
                postId={postId}
                likePost={likePost}
                setViewComments={setViewComments}
            />
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
