export default function Comments({comments}) {
    return (
        <>
            {comments.map(obj => {
                const { userId, userName, comment } = obj 
                return (
                    <div className="comment">
                        <div className="comment-header">
                            <div className="pic-div" style={{ marginRight: 0 }}>
                                <img
                                    className="profile-pic"
                                    src={require(`../images/profile-pic.png`)}
                                    alt="Picture of user"
                                />
                            </div>
                            <div className="user-name">{userName}</div>
                        </div>
                        <div className="comment-body">
                            {comment}
                        </div>
                    </div>
                )
            }) }
        </>
    )
}
