import { useMutation} from '@apollo/client';
import { CREATE_POST } from '../mutations/postMutations';
import { GET_POSTS } from '../queries/postsQuery';
import { StateContext } from '../containers/Provider'; 
import { useState, useContext} from 'react';

export default function MakePost({user}) {
    // State 
    const [description, setDescription] = useState('')
    const [state] = useContext(StateContext);

    // Mutation for creating posts
    const [createPost] = useMutation(CREATE_POST, {
        variables: {
            description
        },
        update(cache, { data: { createPost: { post } } }) {
            const { posts } = cache.readQuery({ query: GET_POSTS })
            cache.writeQuery({
                query: GET_POSTS, 
                data: { posts: [...posts, post]}
            })            
        }
    })


    const handleSubmit = e => {
        // Prevent form from being submitted to server 
        e.preventDefault()
        createPost(description)
    }

    return (
        <form id="make-post" onSubmit={handleSubmit}>
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
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder={`What's on your mind, ${user.name}?`}
                />
            </div>
            <div id="make-post-lower">
                <button
                    type="submit"
                    className="btn btn-success"
                    disabled={description === ""}
                >
                    Post
                </button>
            </div>
        </form>
    )
}
