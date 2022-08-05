import { useMutation } from '@apollo/client';
import { GET_POSTS } from '../queries/postsQuery';
import { DELETE_POST } from '../mutations/postMutations';
export default function CautionModal({postId}) {
    // Delete post mutation 
    const [deletePost] = useMutation(DELETE_POST, {
        variables: {
            postId
        },
        update(cache) {
            let { posts } = cache.readQuery({
                query: GET_POSTS
            })

            posts = posts.filter(post => post._id !== postId)

            // Update cache for posts 
            cache.writeQuery({
                query: GET_POSTS,
                data: { posts: [...posts] }
            })

        }
    })

    return (
        <div className="modal" id="cautionModal">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Delete Post?</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body">
                        All posts deleted are unrecoverable. Are you sure you want to delete post?
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => deletePost(postId)} data-bs-dismiss="modal">Yes</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
