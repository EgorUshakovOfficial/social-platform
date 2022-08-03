import { gql } from '@apollo/client'; 

const POST_SUBSCRIPTION = gql`
    subscription OnPostCreated($userId: ID!){
        newPost(userId: $userId){
            _id
            description
            createdAt
            likes{
                userName
                userId
            }
            comments{
                userId
                userName
                comment
            }
            author{
                name
            }
        }
    }
`

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

export {POST_SUBSCRIPTION, LIKE_SUBSCRIPTION}