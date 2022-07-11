import { Link } from 'react-router-dom';
import { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faBell} from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

export default function Header() {
    // State 
    const [filter, setFilter] = useState('')

    return (
        <header id="header">
            <div id="header-left">
                <Link to="/">
                    <div className="pic-div">
                        <img
                            id="friends-book-logo"
                            src={require('../images/friends-book-logo.png')}
                            alt="Picture of company logo"
                        />
                    </div>
                </Link>
                <div id="header-input">
                    <input
                        id="header-search"
                        onChange={e => setFilter(e.target.value)}
                        value={filter}
                        placeholder="Search Friends Book"
                    />
                </div>
            </div>
            <div id="header-center">

            </div>
            <ul id="navbar">
                <li className="icon">
                    <FontAwesomeIcon icon={faEllipsis} />
                </li>
                <li className="icon">
                    <FontAwesomeIcon icon={faBell} />
                </li>
                <Link to="/messages">
                    <li className="icon">
                        <FontAwesomeIcon icon={faFacebookMessenger} />
                    </li>
                </Link>
                <Link to="/profile">
                    <li className="pic-div">
                        <img
                            className="profile-pic"
                            src={require('../images/profile-pic.png')}
                            alt="Picture of user"
                        />
                    </li>
                </Link>
            </ul>
        </header>
    )
}
