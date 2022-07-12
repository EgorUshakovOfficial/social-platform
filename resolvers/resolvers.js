const resolvers = {
    Query: {
        hello: () => "hello world",
        user: (_, { id }, { dataSources }) => {
            return dataSources.users.getUser(id)
        },
    },
    Mutation: {
        createPost: async (_, { description }, { dataSources, user }) => {
            try {
                let post = await dataSources
                    .posts
                    .createPost(description, user._id)
                    .save()
                post = {
                    description: post.description, 
                    createdAt: post.createdAt, 
                    author: {
                        _id: user._id, 
                        name: user.name, 
                        email: user.email
                    }, 
                    numComments: post.numComments, 
                    numLikes: post.numLikes
                }

                console.log(post)
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
