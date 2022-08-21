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

export {POST_SUBSCRIPTION}