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
        }
    },
    Mutation: {
        createPost: async (_, { description }, { dataSources, user}) => {
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

        likePost: async (_, { postId }, { dataSources, user}) => {
            try {
                let post = await dataSources.posts.updateLikes(postId, user.name, user._id.toString())

                post = {
                    _id: post._id,
                    description: post.description,
                    createdAt: post.createdAt,
                    authorId: user._id.toString(),
                    comments: post.comments,
                    likes: post.likes
                }

                // Publish when user likes specific post
                await pubsub.publish("POST_LIKED", {
                    likedPost: {...post}
                })

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
                    error: err.extensions.response.body,
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
                    authorId: user._id.toString(),
                    comments: post.comments,
                    likes: post.likes
                }

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
                    error: err.extensions.response.body, 
                    post: null
                }
            }
        }
    },
    Subscription: {
        newPost: {
            subscribe: withFilter(
                () => pubsub.asyncIterator("POST_CREATED"), 
                (payload, variables) => {
                    const { newPost } = payload
                    return (newPost.authorId !== variables.userId)
                }
            )
        }, 
        likedPost: {
            subscribe: () => pubsub.asyncIterator("POST_LIKED")
        }
    }, 
    Post: {
        author: ({ authorId }, _, { dataSources }) => {
            return dataSources.users.getUser(authorId);
        }
    }
}

module.exports = resolvers; 
