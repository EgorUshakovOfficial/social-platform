export default function Comments() {
    return (
        <div className="comments">
            <div className="comment">
                <div className="comment-header">
                    <div className="pic-div" style={{ marginRight: 0}}>
                        <img
                            className="profile-pic"
                            src={require(`../images/profile-pic.png`)}
                            alt="Picture of user"
                        />
                    </div>
                    <div className="user-name">Author name</div>
                </div>
                <div className="comment-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </div>
            <div className="comment">
                <div className="comment-header">
                    <div className="pic-div" style={{ marginRight: 0 }}>
                        <img
                            className="profile-pic"
                            src={require(`../images/profile-pic.png`)}
                            alt="Picture of user"
                        />
                    </div>
                    <div className="user-name">Author name</div>
                </div>
                <div className="comment-body">
                    This is a test!
                </div>
            </div>
        </div>
    )
}
