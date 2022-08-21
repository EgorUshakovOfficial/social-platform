import { gql } from '@apollo/client'; 

const NOTIFICATION_SUBSCRIPTION = gql`
    subscription newNotification($userId: String!){
        newNotification(userId: $userId){
            _id
            userId
            newsDescription
        }
    }
`

export { NOTIFICATION_SUBSCRIPTION }