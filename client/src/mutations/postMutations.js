import { gql } from '@apollo/client'; 

const CREATE_POST = gql`
    mutation CreatePost($description: String!){
        createPost(description: $description){
            post{
                _id
                description
                createdAt
                comments{
                    userId
                    comment
                }
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
`;

const COMMENT_POST = gql`
    mutation CommentPost($postId: ID!, $comment: String!){
        commentPost(postId: $postId, comment: $comment){
            post{
                comments{
                    userId
                    userName
                    comment
                }
            }
        }
    }
`;

export { CREATE_POST, LIKE_POST, COMMENT_POST};  
