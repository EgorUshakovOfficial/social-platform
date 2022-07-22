const { PubSub, withFilter} = require('graphql-subscriptions'); 
let pubsub = new PubSub(); 
const resolvers = {
    Query: {
        user: (_, __, { user }) => {
            return user
        },
        posts: (_, __, { dataSources }) => {
            return dataSources.posts.getPosts()
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
                    numComments: post.numComments,
                    numLikes: post.numLikes
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
                    code: err.extensions.response.status,
                    error: err.extensions.response.body,
                    success: false,
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
        }
    }, 
    Post: {
        author: ({ authorId }, _, { dataSources }) => {
            return dataSources.users.getUser(authorId);
        }
    }
}

module.exports = resolvers; 
