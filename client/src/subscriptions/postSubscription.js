import { gql } from '@apollo/client'; 

const POST_SUBSCRIPTION = gql`
    subscription OnPostCreated($userId: ID!){
        newPost(userId: $userId){
            description
            createdAt
            numLikes
            numComments
            author{
                name
            }
        }
    }
`

export {POST_SUBSCRIPTION}