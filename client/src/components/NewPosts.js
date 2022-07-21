import { useSubscription, useApolloClient} from '@apollo/client'; 
import { POST_SUBSCRIPTION } from '../subscriptions/postSubscription'; 

export default function NewPosts({ user }) {
    console.log(user)

    // Subscription
    const { data, loading } = useSubscription(POST_SUBSCRIPTION, {
        variables: {
            userId: user._id
        }
    })
    console.log(data);
    return (
        <div>
            {JSON.stringify(data)} 
        </div>
    )
}