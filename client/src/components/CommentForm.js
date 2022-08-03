import { useState } from 'react'; 
export default function CommentForm() {
    // State 
    const [comment, setComment] = useState('')

    // Handle submit 
    const handleSubmit = e => {
        // Prevent form from being submitted to the server 
        e.preventDefault()


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
