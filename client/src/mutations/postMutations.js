import { gql } from '@apollo/client'; 

const CREATE_POST = gql`
    mutation CreatePost($description: String!){
        createPost(description: $description){
            post{
                _id
                description
                createdAt
                comments
                likes{
                    userName
                    userId
                }
                author{
                    name
                }
            }
        }
    }
`; 

const LIKE_POST = gql`
    mutation LikePost($postId: ID!){
        likePost(postId: $postId){
            post{
                likes{
                    userName
                    userId
                }
            }
        }
    }
`

export { CREATE_POST, LIKE_POST};  
