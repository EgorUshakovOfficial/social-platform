import Notifications from './Notifications';

export default function NotificationDropdown({user}) { 
    return (
        <div id="notification-dropwdown">
            <h3 className="notification-title">Notifications</h3>
            <Notifications user={user} />
        </div>
    )
}