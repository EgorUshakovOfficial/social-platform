import { gql } from '@apollo/client'; 

const GET_COMMENTS = gql`
    query GetComments($postId: ID!){
        comments(postId: $postId){
            userId
            userName
            comment
        }
    }
`

export { GET_COMMENTS };
