const { PubSub, withFilter} = require('graphql-subscriptions'); 
let pubsub = new PubSub(); 
const resolvers = {
    Query: {
        user: (_, __, { user }) => {
            return user
        },
        posts: (_, __, { dataSources }) => {
            return dataSources.posts.getPosts()
        }, 
        post: (_, {postId}, { dataSources }) => {
            return dataSources.posts.getPost(postId)
        }, 
        comments: (_, { postId }, { dataSources }) => {
            return dataSources.posts.getComments(postId)
        },
        notifications: (_, { userId }, {dataSources}) => {
            return dataSources.users.getNotifications(userId)
        }
    },
    Mutation: {
        createPost: async (_, { description }, { dataSources, user }) => {
            try {
                let post = await dataSources
                    .posts
                    .createPost(description, user._id)
                    .save()

                post = {
                    _id: post._id,
                    description: post.description,
                    createdAt: post.createdAt,
                    authorId: user._id.toString(),
                    comments: post.comments,
                    likes: post.likes
                }

                // Publish on creation of post  
                await pubsub.publish("POST_CREATED", {
                    newPost: { ...post }
                })

                return {
                    success: true,
                    code: 200,
                    message: "Post has been successfully and saved in the database",
                    post
                }

            }
            catch (err) {
                return {
                    success: false,
                    code: err.extensions.response.status,
                    error: err.extensions.response.body,
                    post: null
                }
            }
        },

        deletePost: async (_, { postId }, { dataSources }) => {
            console.log(postId)
            try {
                await dataSources.posts.deletePost(postId)
                return {
                    success: true,
                    code: 200,
                    message: `Post has been successfully deleted`,
                    post: null
                }
            } catch (err) {
                return {
                    success: false,
                    code: err.extensions.response.status,
                    message: err.extensions.response.body,
                    post: null
                } 
            }
        }, 

        editPost: async (_, { postId, description }, { dataSources, user}) => {
            try {
                let post = await dataSources.posts.editPost(postId, description)
      
                post = {
                    _id: post._id,
                    description: post.description,
                    createdAt: post.createdAt,
                    authorId: user._id.toString(), // Bug here 
                    comments: post.comments,
                    likes: post.likes
                }

                return {
                    success: true, 
                    code: 200,
                    message: `Post with post ID ${postId} has been successfully edited`, 
                    post
                }
            } catch (err) {
                return {
                    success: false, 
                    code: err.extensions.response.status, 
                    message: err.extensions.response.body, 
                    post: null
                }
            }

        },

        likePost: async (_, { postId }, { dataSources, user}) => {
            try {
                let userId = user._id.toString()
                let { post, event } = await dataSources.posts.updateLikes(postId, user.name, userId)
                post = {
                    _id: post._id,
                    description: post.description,
                    createdAt: post.createdAt,
                    authorId: post.authorId,
                    comments: post.comments,
                    likes: post.likes
                }
                let authorId = post.authorId

                // Publish when user likes specific post
                pubsub.publish("POST_LIKED", {
                    likedPost: {...post}
                })

                // Publish after user likes post 
                if (event === "liked" && authorId !== userId) {
                    await dataSources.users.updateNotifications(user, authorId, event)
                }

                return {
                    success: true, 
                    code: 200, 
                    message: `Likes has been successfully updated for post ${postId} and saved in database`, 
                    post
                }
            }
            catch (err) {
                return {
                    success: false,
                    code: err.extensions.response.status,
                    message: err.extensions.response.body,
                    post: null
                } 
            }

        }, 

        commentPost: async (_, { postId, comment}, { dataSources, user }) => {
            try {
                let post = await dataSources.posts.updateComments(postId, comment, user)

                post = {
                    _id: post._id,
                    description: post.description,
                    createdAt: post.createdAt,
                    authorId: postId.authorId,
                    comments: post.comments,
                    likes: post.likes
                }

                // Publish when use comments on post 
                pubsub.publish("POST_COMMENTED", {
                    commentedPost: {...post}
                })

                return {
                    success: true,
                    code: 200,
                    message: `Comments has been successfully updated for comment ${postId} and saved in database`,
                    post
                }


            } catch (err) {
                return {
                    success: false, 
                    code: err.extensions.response.status, 
                    message: err.extensions.response.body, 
                    post: null
                }
            }
        }
    },
    Subscription: {
        newPost: {
            subscribe: () => pubsub.asyncIterator("POST_CREATED")
        }, 
        likedPost: {
            subscribe: () => pubsub.asyncIterator("POST_LIKED")
        }, 
        commentedPost: {
            subscribe: () => pubsub.asyncIterator("POST_COMMENTED")
        }
    }, 
    Post: {
        author: ({ authorId }, _, { dataSources }) => {
            return dataSources.users.getUser(authorId);
        }
    }
}

module.exports = resolvers; 
