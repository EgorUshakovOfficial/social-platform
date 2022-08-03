import { useQuery } from '@apollo/client'; 
import { GET_COMMENTS } from '../queries/commentsQuery'; 
import Spinner from './Spinner'; 
export default function Comments({postId}) {
    // Comments query 
    const { data, loading, error } = useQuery(GET_COMMENTS, {
        variables: {
            postId
        }
    })

    if (loading) { return <Spinner /> }

    if (error) { return <p>Error! Something went wrong!</p> }

    return (
        <>
            {data.comments.map(obj => {
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
                            {comment }
                        </div>
                    </div>
                )
            }) }
        </>
        //<div className="comments">
            //<div className="comment">
            //    <div className="comment-header">
            //        <div className="pic-div" style={{ marginRight: 0}}>
            //            <img
            //                className="profile-pic"
            //                src={require(`../images/profile-pic.png`)}
            //                alt="Picture of user"
            //            />
            //        </div>
            //        <div className="user-name">Author name</div>
            //    </div>
            //    <div className="comment-body">
            //        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            //    </div>
            //</div>
        //    <div className="comment">
        //        <div className="comment-header">
        //            <div className="pic-div" style={{ marginRight: 0 }}>
        //                <img
        //                    className="profile-pic"
        //                    src={require(`../images/profile-pic.png`)}
        //                    alt="Picture of user"
        //                />
        //            </div>
        //            <div className="user-name">Author name</div>
        //        </div>
        //        <div className="comment-body">
        //            This is a test!
        //        </div>
        //    </div>
        //</div>
    )
}
