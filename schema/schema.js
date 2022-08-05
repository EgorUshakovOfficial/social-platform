const { gql } = require('apollo-server'); 

const typeDefs = gql`
    type Query{
        user: User!
        posts: [Post!]
        post(postId: ID!): Post!
        comments(postId: ID!): [Comment!]!
    }

    type Mutation{
        createPost(description: String!): PostResponse!
        deletePost(postId: ID!): PostResponse! 
        editPost(postId: ID!, description: String!): PostResponse!
        likePost(postId: ID!): PostResponse! 
        commentPost(postId: ID!, comment: String!): PostResponse!
        
    }

    type Subscription{
        newPost(userId: ID!): Post
        likedPost: Post
        commentedPost: Post
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

    type Comment{
        userId: ID!
        userName: String!
        comment: String!
    }

    type Post{
        _id: ID!
        description: String!
        createdAt: String!
        author: User!
        comments: [Comment!]!
        likes: [Like!]!
    }
`

module.exports = typeDefs; 
