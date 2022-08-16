import usePostService from '../hooks/usePostService'; 
export default function MakePost({ user }) {
    const {description,setDescription,onSubmit} = usePostService()
    return (
        <form id="make-post" onSubmit={onSubmit}>
            <div id="make-post-upper">
                <div className="pic-div">
                    <img
                        className="profile-pic"
                        src={require('../images/profile-pic.png')}
                        alt="Picture of user"
                    />
                </div>
                <textarea
                    id="make-post-textarea"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder={`What's on your mind, ${user.name}?`}
                />
            </div>
            <div id="make-post-lower">
                <button
                    type="submit"
                    className="btn btn-success"
                    disabled={description === ""}
                >
                    Post
                </button>
            </div>
        </form>
    )
}
