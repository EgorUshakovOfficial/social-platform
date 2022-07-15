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
}

module.exports = Posts; 
