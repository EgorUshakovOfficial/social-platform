import { useMutation } from "@apollo/client"; 
import { LIKE_POST } from '../mutations/postMutations';
import { GET_POSTS } from '../queries/postsQuery';
import { formatTime } from '../utils/formatTime'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faThumbsUp,
    faComment,
    faShare
} from '@fortawesome/free-solid-svg-icons';

export default function Post({
    user,
    postId,
    authorName,
    createdAt,
    description,
    likes,
    comments }) {

    // Like mutation
    const [likePost] = useMutation(LIKE_POST, {
        variables: {
            postId 
        }, 
        update(cache, { data }) {
            // All posts
            let { posts } = cache.readQuery({
                query: GET_POSTS
            })

            posts = [...posts]

            // Liked  post
            let likedPost = { ...posts.filter(obj => obj._id === postId)[0] }
            let index = posts.findIndex(obj => obj._id === postId);
            likedPost.likes = [...data.likePost.post.likes]
            posts[index] = likedPost

            // Update cache for posts 
            cache.writeQuery({
                query: GET_POSTS,
                data: { posts: [...posts] }
            })
        }
    })

    return (
        <div className="post" key={postId}>
            <div className="user-container">
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
                <button className="reaction" onClick={() => likePost(postId)}>
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
}
