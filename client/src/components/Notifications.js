import Spinner from './Spinner';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_NOTIFICATIONS } from '../queries/notificationsQuery';
export default function Notifications({user}) {
    const { data, loading } = useQuery(GET_NOTIFICATIONS, {
        variables: {
            userId: user._id
        }
    })
    return (
        <ul id="notifications" style={{minHeight: loading ? "100px": "0px"}}>
            {loading === true && <Spinner />}
            {(loading === false && data) &&
                data.notifications.news.map(obj => {
                    return (
                        <li className="notification">
                            <div className="pic-div">
                                <img
                                    className="profile-pic"
                                    src={require('../images/profile-pic.png')}
                                    alt="Picture of company logo"
                                />
                            </div>
                            <p className="notification-description">{obj.newsDescription}</p>
                        </li>
                    )
                })
            }
            {
            }
        </ul>
    )
}
