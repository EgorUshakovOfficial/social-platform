const { gql } = require('apollo-server'); 

const typeDefs = gql`
    type Query{
        user: User!
        posts: [Post!]
    }

    type Mutation{
        createPost(description: String!): CreatePostResponse!
    }

    type Subscription{
        newPost(userId: ID!): Post
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
        _id: ID!
        description: String!
        createdAt: String!
        author: User!
        numComments: Int!
        numLikes: Int!
    }
`

module.exports = typeDefs; 
