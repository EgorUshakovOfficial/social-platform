import { StateContext } from '../containers/Provider';
import { useSubscription } from '@apollo/client'; 
import { useContext } from 'react'; 
import { POST_SUBSCRIPTION } from '../subscriptions/postSubscription'; 

export default function NewPosts() {
    // Token
    const [state] = useContext(StateContext)

    // Subscription 
    const { data, loading } = useSubscription(POST_SUBSCRIPTION)

    console.log(data)
    console.log(loading)
    return (
        <div>
            {loading === false && JSON.stringify(data)} 
        </div>
    )
}