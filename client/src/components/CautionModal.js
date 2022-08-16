import { useMutation } from '@apollo/client';
import { GET_POSTS } from '../queries/postsQuery';
import { DELETE_POST } from '../mutations/postMutations';
import { PostContext } from '../containers/PostProvider'; 
import { useContext } from 'react'; 
export default function CautionModal() {
    const { deletePostId, setDeletePostId } = useContext(PostContext)

    // Delete post mutation
    const [deletePost] = useMutation(DELETE_POST, {
        variables: {
            postId: deletePostId
        },
        update(cache) {
            let { posts } = cache.readQuery({
                query: GET_POSTS
            })

            posts = posts.filter(post => post._id !== deletePostId)

            // Update cache for posts 
            cache.writeQuery({
                query: GET_POSTS,
                data: { posts: [...posts] }
            })

        }
    })

    const onClick = () => {
        deletePost(deletePostId)
        setDeletePostId('')
    } 

    return (
        <div className="modal" id="cautionModal">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Delete Post?</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body">
                        Are you sure you want to delete post?
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={onClick} data-bs-dismiss="modal">Yes</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setDeletePostId('')}>No</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
