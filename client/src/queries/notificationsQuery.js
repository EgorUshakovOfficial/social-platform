import { gql } from '@apollo/client'; 

const GET_NOTIFICATIONS = gql`
    query GetNotifications($userId: String!){
        notifications(userId: $userId){
            isOpened
            news{
                newsDescription
            }
        }
    }
`

export { GET_NOTIFICATIONS }
