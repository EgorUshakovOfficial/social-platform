import { useState } from 'react'; 
import { useMutation} from '@apollo/client'; 
import { COMMENT_POST } from '../mutations/postMutations';
import { GET_POSTS } from '../queries/postsQuery';  
export default function CommentForm({user, postId}) {
    // State 
    const [comment, setComment] = useState('')

    const [commentPost] = useMutation(COMMENT_POST, {
        variables: {
            postId,
            comment
        }, 

        update(cache, { data }) {
            // Previous cache of posts 
            let { posts } = cache.readQuery({ query: GET_POSTS })
            posts = [...posts]
            let index = posts.findIndex(obj => obj._id === postId)
            let updatedPost = {...posts[index]}
            updatedPost.comments = [...data.commentPost.post.comments]
            posts[index] = updatedPost 
            console.log(posts)
            // Update cache for posts 
            cache.writeQuery({
                query: GET_POSTS, 
                data: {posts:[...posts]}
            })
        }
    })

    // Handle submit 
    const handleSubmit = e => {
        // Prevent form from being submitted to the server 
        e.preventDefault()

        commentPost(postId, comment)

        setComment('')
    }

    return (
        <form id="comment-form" onSubmit={handleSubmit}>
            <div className="pic-div" style={{margin: 0}}>
                <img
                    className="profile-pic"
                    src={require('../images/profile-pic.png')}
                    alt="Picture of user"
                />
            </div>
            <input 
                id="comment-input"
                type="text"
                placeholder="Write a comment"
                value={comment}
                onChange={e => setComment(e.target.value) }
            />
            <button
                id="comment-submit"
                className="btn btn-success"
                type="submit"
                disabled={comment === "" }
            >
                Post
            </button>
        </form>
    )
}
