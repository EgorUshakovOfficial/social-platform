const { gql } = require('apollo-server'); 

const typeDefs = gql`
    type Query{
        user: User!
        posts: [Post!]
        post(postId: ID!): Post!
    }

    type Mutation{
        createPost(description: String!): PostResponse!
        likePost(postId: ID!): PostResponse! 
    }

    type Subscription{
        newPost(userId: ID!): Post
    }

    type PostResponse{
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

    type Like{
        userId: ID! 
        userName: String! 
    }

    type Post{
        _id: ID!
        description: String!
        createdAt: String!
        author: User!
        comments: [String!]!
        likes: [Like!]!
    }
`

module.exports = typeDefs; 
