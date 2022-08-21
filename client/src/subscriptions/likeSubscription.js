import { gql } from '@apollo/client'; 

const LIKE_SUBSCRIPTION = gql`
    subscription OnPostLiked{
        likedPost{
            _id
            likes{
                userName
                userId
            }
        }
    }
`

export { LIKE_SUBSCRIPTION}