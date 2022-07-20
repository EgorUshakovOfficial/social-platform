import { gql } from '@apollo/client'; 

const POST_SUBSCRIPTION = gql`
    subscription OnPostCreated{
        newPost{
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