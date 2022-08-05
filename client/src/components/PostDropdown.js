import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEllipsis,
    faTrash, 
    faEdit
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'; 
export default function PostDropdown() {
    // State 
    const [showDisplay, setShowDisplay] = useState(false)

    return (
        <div className="post-dropdown">
            <div
                className="post-options-icon"
                onClick={() => setShowDisplay(state => !state)}
            >
                <FontAwesomeIcon icon={faEllipsis} />
            </div>
            {showDisplay && <div className="post-options">
                <button className="post-option btn btn-secondary">
                    Edit <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="post-option btn btn-danger">
                    Delete <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>}
        </div>
    )
}
