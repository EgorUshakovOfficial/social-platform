import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faBell } from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import NotificationDropdown from './NotificationDropdown'; 
import { Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <ul id="navbar">
            <li className="icon">
                <FontAwesomeIcon icon={faEllipsis} />
            </li>
            <li className="icon">
                <FontAwesomeIcon icon={faBell} />
                <span className="badge">1</span>
            </li>
            <Link to="/messages">
                <li className="icon">
                    <FontAwesomeIcon icon={faFacebookMessenger} />
                </li>
            </Link>
            <Link to="/profile">
                <li className="pic-div" style={{ marginLeft: "0.8em", marginRight: "0" }}>
                    <img
                        className="profile-pic"
                        src={require('../images/profile-pic.png')}
                        alt="Picture of user"
                    />
                </li>
            </Link>
            <NotificationDropdown />
        </ul>
    )
}