import { useState } from 'react'; 
import { useMutation, useSubscription } from '@apollo/client';
import { LIKE_POST } from '../mutations/postMutations';
import { LIKE_SUBSCRIPTION } from '../subscriptions/likeSubscription';
import { COMMENT_SUBSCRIPTION } from '../subscriptions/commentSubscription';
import { GET_NOTIFICATIONS } from '../queries/notificationsQuery';
import { NOTIFICATION_SUBSCRIPTION } from '../subscriptions/notificationSubscription';
export default function useReactions({postId, userId}) {
    const [viewComments, setViewComments] = useState(false)

    // Like mutation
    const [likePost] = useMutation(LIKE_POST, {
        variables: {
            postId
        }
    })

    // Like subscription
    useSubscription(LIKE_SUBSCRIPTION, {
        onSubscriptionData: async ({ client }) => {
            // Refetch notifications query  
            await client.refetchQueries({
                include: [GET_NOTIFICATIONS]
            })
        }
    })

    // New notification 
    useSubscription(NOTIFICATION_SUBSCRIPTION, {
        variables: {
            userId
        },
        onSubscriptionData: ({ client, subscriptionData }) => {
            console.log("Getting data...")
            // Previous cache of notifications 
            let { notifications } = client.readQuerty({ query: GET_NOTIFICATIONS })

            let news = notifications.news

            // New notification 
            let newNotification = subscriptionData.data.newNotification

            news.push(newNotification)

            // Update cache of notifications
            client.writeQuery({
                query: GET_NOTIFICATIONS,
                data: {
                    notifications: {
                        isOpened: false,
                        news: []
                    }
                }
            })
        }
    })

    // Comment subscription
    useSubscription(COMMENT_SUBSCRIPTION, {
        onSubscriptionData: ({ client, subscriptionData }) => {
            console.log(subscriptionData)
        }
    })

    return {
        likePost, 
        viewComments, 
        setViewComments
    }
}