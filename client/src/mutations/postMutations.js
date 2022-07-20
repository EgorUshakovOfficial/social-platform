import { gql } from '@apollo/client'; 

const CREATE_POST = gql`
    mutation CreatePost($description: String!){
        createPost(description: $description){
            post{
                _id
                description
                createdAt
                numComments
                numLikes
                author{
                    name
                }
            }
        }
    }
`; 

export { CREATE_POST };  
