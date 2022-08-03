import { useState } from 'react'; 
import { useMutation } from '@apollo/client'; 
import { COMMENT_POST } from '../mutations/postMutations';
import { GET_COMMENTS } from '../queries/commentsQuery'; 
export default function CommentForm({user, postId}) {
    // State 
    const [comment, setComment] = useState('')

    const [commentPost] = useMutation(COMMENT_POST, {
        variables: {
            postId,
            comment
        }, 
        update(cache, {data}) {
            
            // Previous cache of comments 
            const { comments } = cache.readQuery({
                query: GET_COMMENTS, 
                variables: {
                    postId
                }
            })
            console.log(data)
            // Update cache 
            cache.writeQuery({
                query: GET_COMMENTS,
                variables: {
                    postId
                }, 
                data: {comments: [...data.commentPost.post.comments]}
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
