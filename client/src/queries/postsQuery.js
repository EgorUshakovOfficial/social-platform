import { gql } from '@apollo/client'; 

const GET_POSTS = gql`
    query getPosts{
        posts{
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

const GET_POST = gql`
    query getPost($postId: ID!){
        post(postId: $postId){
            _id
            description
            createdAt
            likes{
                userName
                userId
            }
            comments
            author{
                name
            }
        }
    }
`

export { GET_POSTS, GET_POST}; 
