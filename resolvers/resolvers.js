const resolvers = {
    Query: {
        posts: (_, __, {dataSources}) => {
            return dataSources.posts.getPosts()
        }
    },
    Post: {
        author: ({authorId} , _, { dataSources }) => {
            if (authorId === undefined) {return}
            return dataSources.users.getUser(authorId);
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
                    authorId: user._id, 
                    numComments: post.numComments, 
                    numLikes: post.numLikes
                }

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
    }
}

module.exports = resolvers; 
