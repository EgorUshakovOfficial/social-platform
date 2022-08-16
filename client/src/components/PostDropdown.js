import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEllipsis,
    faTrash, 
    faEdit
} from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react'; 
import { PostContext } from '../containers/PostProvider'; 
export default function PostDropdown({postId }) {
    const [showDisplay, setShowDisplay] = useState(false) 
    const { setDeletePostId, setEditPostId} = useContext(PostContext)
    const onDeleteClick = () => {
        setDeletePostId(postId)
        setShowDisplay(false)
    }
    const onEditClick = () => {
        setEditPostId(postId)
        setShowDisplay(false)
    }
    return (
        <div className="post-dropdown">
            <div
                className="post-options-icon"
                onClick={() => setShowDisplay(state => !state)}
            >
                <FontAwesomeIcon icon={faEllipsis} />
            </div>
            {showDisplay && <div className="post-options">
                <button className="post-option btn btn-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onClick={onEditClick}
                >
                    Edit <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                    type="button"
                    className="post-option btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#cautionModal"
                    onClick={onDeleteClick}
                >
                    Delete <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>}
        </div>
    )
}
