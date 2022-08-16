import Notification from './Notification'
export default function Notifications() {
    return (
        <ul id="notifications">
            <li className="notification">
                <div className="pic-div">
                    <img
                        className="profile-pic"
                        src={require('../images/profile-pic.png')}
                        alt="Picture of company logo"
                    />
                </div>
                <p className="notification-description">Egor Ushakov liked your photo</p>
            </li>
            <li className="notification">
                <div className="pic-div">
                    <img
                        className="profile-pic"
                        src={require('../images/profile-pic.png')}
                        alt="Picture of company logo"
                    />
                </div>
                <p className="notification-description">Egor Ushakov liked your photo</p>
            </li>            <li className="notification">
                <div className="pic-div">
                    <img
                        className="profile-pic"
                        src={require('../images/profile-pic.png')}
                        alt="Picture of company logo"
                    />
                </div>
                <p className="notification-description">Egor Ushakov liked your photo</p>
            </li>
        </ul>
    )
}
