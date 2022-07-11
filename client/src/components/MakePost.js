import { useState } from 'react';
export default function MakePost() {
    // State 
    const [post, setPost] = useState('')
    let name = "John"
    return (
        <form id="make-post">
            <div id="make-post-upper">
                <div className="pic-div">
                    <img
                        className="profile-pic"
                        src={require('../images/profile-pic.png')}
                        alt="Picture of user"
                    />
                </div>
                <textarea
                    id="make-post-textarea"
                    onChange={e => setPost(e.target.value)}
                    placeholder={`What's on your mind, ${name}?`}
                />
            </div>
            <div id="make-post-lower">
                <button type="submit" className="btn btn-success">Post</button>
            </div>
        </form>
    )
}
