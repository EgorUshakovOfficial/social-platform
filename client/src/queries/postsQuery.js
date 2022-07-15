import { gql } from '@apollo/client'; 

const GET_POSTS = gql`
    query getPosts{
        posts{
            _id
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

export { GET_POSTS }; 
