import { useState } from 'react'; 
import { useMutation } from '@apollo/client'; 
import { EDIT_POST } from '../mutations/postMutations'; 
import { GET_POSTS } from '../queries/postsQuery';
export default function EditModal({postId }) {
    // State 
    const [description, setDescription] = useState('')

    // Edit post mutation 
    const [editPost] = useMutation(EDIT_POST, {
        variables: {
            postId, 
            description
        }, 
        update(cache, { data }) {
            let { posts } = cache.readQuery({
                query: GET_POSTS
            })
            posts = [...posts]
            let index = posts.findIndex(post => post._id === postId)
            let updatedPost = {...posts[index]}
            updatedPost.description = description
            posts[index] = updatedPost

            // Update cache 
            cache.writeQuery({
                query: GET_POSTS, 
                data: {posts: [...posts]}
            })

        }
    })

    return (
        <div className="modal" id="editModal">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Edit Post</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body">
                        <div className="pic-div">
                            <img
                                className="profile-pic"
                                src={require('../images/profile-pic.png')}
                                alt="Picture of user"
                            />
                        </div>
                        <textarea
                            id="edit-post"
                            onChange={ e => setDescription(e.target.value)}
                            value={description}
                            placeholder={`What's on your mind?`}
                        />
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            disabled={description === ""}
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={() => editPost(postId, description)}
                        >
                            Edit
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}