const { gql } = require('apollo-server'); 

const typeDefs = gql`
    type Query{
        hello: String!
        user(id: ID!): User!
        users: [User!]
    }

    type Mutation{
        createPost(description: String!): CreatePostResponse!
    }

    type CreatePostResponse{
        success: Boolean!
        code: Int!
        message: String!
        post: Post
    }

    type User{
        _id: ID!
        name: String! 
        email: String!  
    }

    type Post{
        description: String!
        createdAt: String!
        author: User!
        numComments: Int!
        numLikes: Int!
    }
`

module.exports = typeDefs; 
