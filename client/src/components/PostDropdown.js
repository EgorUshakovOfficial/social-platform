import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEllipsis,
    faTrash, 
    faEdit
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'; 
export default function PostDropdown({userId}) {
    // State 
    const [showDisplay, setShowDisplay] = useState(false); 

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
                    onClick={() => setShowDisplay(false)}
                >
                    Edit <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                    type="button"
                    className="post-option btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#cautionModal"
                    onClick={() => setShowDisplay(false)}
                >
                    Delete <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>}            
        </div>
    )
}
