import { useState } from 'react'; 
export default function CreatePost() {
    // State 
    const [post, setPost] = useState('')

    // Name
    let name = "John"

    return (
        <form id="create-post">
            <div id="create-post-upper"className="row">
                <div className="profile-pic-div">
                    <img src={require('../images/profile-pic.png')} className="profile-pic" />
                </div>
                <textarea
                    rows="4"
                    cols="50"
                    onChange={e => setPost(e.target.value)}
                    value={post}
                    placeholder={`What is on your mind, ${name}`}
                />
            </div>

            <button type="submit" id="create-post-button">Post</button>
        </form>
    )
}