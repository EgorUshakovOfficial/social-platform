import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleDot} from '@fortawesome/free-solid-svg-icons';
export default function SideBar() {
    return (
        <div id="sidebar">
            <div id="active-users">
                <div className="sidebar-users-name">Active Users</div>
                <ul className="users">
                    <li className="active-user">Brad</li>
                    <li className="active-user">John</li>
                    <li className="active-user">Matthew</li>
                    <li className="active-user">Jacob</li>
                </ul>
            </div>
            <div id="groups">
                <div className="sidebar-groups-name">Groups</div>
                <ul className="users">
                    <li className="group">Soccer</li>
                    <li className="group">Hockey</li>
                    <li className="group">Basketball</li>
                    <li className="group">PHP</li>
                </ul>
            </div>
        </div>
    )
}
