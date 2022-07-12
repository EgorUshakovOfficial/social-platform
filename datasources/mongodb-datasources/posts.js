const { MongoDataSource } = require('apollo-datasource-mongodb');

class Posts extends MongoDataSource {
    getPost(postId) {
        return this.findOneById(postId)
    }

    createPost(description, authorId) {
        let post = new this.model({
            description,
            authorId
        })

        return post;
    }
}

module.exports = Posts; 
