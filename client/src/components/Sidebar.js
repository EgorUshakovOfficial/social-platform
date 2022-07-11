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
                    <li className="active-user">Soccer</li>
                    <li className="active-user">Hockey</li>
                    <li className="active-user">Basketball</li>
                    <li className="active-user">PHP</li>
                </ul>
            </div>
        </div>
    )
}
