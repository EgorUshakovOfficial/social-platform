import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faThumbsUp,
    faComment, 
    faShare
} from '@fortawesome/free-solid-svg-icons';
export default function ReadPost() {
    let name = 'John Doe'
    let numComments = 27
    return (
        <div className="post">
            <div className="user-container">
               <div className="pic-div">
                    <img
                        className="profile-pic"
                        src={require(`../images/profile-pic.png`)}
                        alt="Picture of user"
                    />
                </div>
                <div className="user-info">
                    <div className="user-name">{name}</div>
                    <span className="post-time">July 13, 2022</span>
                </div>
            </div>
            <p className="post-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className="likes-comments">
                <div className="num-likes">
                    <FontAwesomeIcon icon={faThumbsUp} /> 321
                </div>
                <div className="num-comments">
                    {numComments} Comments 
                </div>
            </div>
            <div className="divider" />
            <div className="reactions-container">
                <button className="reaction">
                    Like <FontAwesomeIcon icon={faThumbsUp} />
                </button>
                <button className="reaction">
                    Comment<FontAwesomeIcon icon={faComment} />
                </button>
                <button className="reaction">
                    Share<FontAwesomeIcon icon={faShare} />
                </button>
            </div>
        </div>
    )
}