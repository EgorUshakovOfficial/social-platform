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

    async deletePost(postId) {
        let deletedPost = await this.model.findOneAndRemove({ _id: postId })
        return null
    }

    async editPost(postId, description) {
        let post = await this.model.findOneAndUpdate({ _id: postId }, { description })
        return post
    }

    async getComments(postId) {
        // Retrieve specific post from database 
        let post = await this.findOneById(postId)

        return post.comments 
    }

    async updateLikes(postId, userName, userId) {
        // Retrieve specific post from database 
        let post = await this.findOneById(postId)

        // Update likes array in specific post
        let likes = post.likes 
        let index = likes.findIndex(obj => obj.userId === userId)

        // Uf user has not liked post, add likes object to likes array
        // Otherwise, remove it from the likes array 
        if (index === -1) {
            likes.push({ userName, userId })
            post = {post, event:"liked"}
        } else {
            likes.splice(index, 1)
            post = {post, event:"disliked"}
        }

        // Find specific post in database and update its likes array 
        await this.model.findOneAndUpdate({ _id: postId }, { likes: [...likes] })

        return post  
    }

    async updateComments(postId, comment, userObj) {
       
        // Retrieve specific post from database 
        let post = await this.findOneById(postId);

        // Update comments array in specific post 
        let comments = post.comments
        let commentObj = {
            userId: userObj._id.toString(),
            userName: userObj.name,
            comment
        }
        comments.push(commentObj)

        // Find specific post in database and update its comments array 
        await this.model.findOneAndUpdate({ _id: postId }, { comments: [...comments] })

        return post
    }
}

module.exports = Posts; 
