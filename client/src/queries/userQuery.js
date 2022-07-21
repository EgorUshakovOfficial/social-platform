import { gql } from '@apollo/client'; 

const GET_USER = gql`
    query getUser{
        user{
            _id
            name 
        }
    }
`

export { GET_USER }; 
