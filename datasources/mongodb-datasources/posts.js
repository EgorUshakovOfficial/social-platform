const { MongoDataSource } = require('apollo-datasource-mongodb');
const MINUTE = 60; 
class Posts extends MongoDataSource {
    getPost(postId) {
        return this.findOneById(postId)
    }

    getPosts(){
        return this.findByFields({})
    }

    createPost(description, authorId) {
        let post = new this.model({
            description,
            authorId
        })

        return post;
    }

    async updateLikes(postId, userName, userId) {
        // Retrieve specific post from database 
        let post = await this.findOneById(postId)

        // Update likes array in specific post
        let likes = post.likes 
        likes.push(userName)

        // Find specific post in database and update its likes array 
        await this.model.findOneAndUpdate({ _id: postId }, { likes: [...likes] })

        return post  
    }
}

module.exports = Posts; 
