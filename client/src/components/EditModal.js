import { useState, useContext } from 'react'; 
import { useMutation } from '@apollo/client'; 
import { EDIT_POST } from '../mutations/postMutations'; 
import { GET_POSTS } from '../queries/postsQuery';
import { PostContext } from '../containers/PostProvider'; 
export default function EditModal() {
    // State 
    const [description, setDescription] = useState('')

    const { editPostId, setEditPostId } = useContext(PostContext)

    console.log(editPostId)

    // Edit post mutation 
    const [editPost] = useMutation(EDIT_POST, {
        variables: {
            postId: editPostId, 
            description
        }, 
        update(cache) {
            let { posts } = cache.readQuery({
                query: GET_POSTS
            })
            posts = [...posts]
            let index = posts.findIndex(post => post._id === editPostId)
            console.log(index)
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

    const onClick = () => {
        editPost(editPostId)
        setEditPostId('')
    }

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
                            onClick={() => setEditPostId('')}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={onClick}
                        >
                            Edit
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}