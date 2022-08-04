import { gql } from '@apollo/client'; 

const COMMENT_SUBSCRIPTION = gql`
    subscription OnPostCommented{
        commentedPost{
            _id
            comments{
                userId
                userName
                comment
            }
        }
    }
`

export { COMMENT_SUBSCRIPTION }; 
