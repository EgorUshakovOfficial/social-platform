const { MongoDataSource } = require('apollo-datasource-mongodb'); 

class Users extends MongoDataSource {
    getUser(userId) {
        return this.findOneById(userId)
    }


    async getNotifications(userId) {
        let user = await this.findOneById(userId)
        console.log("Get notifications", user)
        return user.notifications
    }

    async updateNotifications(user, authorId, event) {
        // Query for user that created post 
        let postUser = await this.findOneById(authorId)

        // Check if user's account exists    
        if (postUser === null) {
            return 
        }

        let userId = user._id.toString()

        // New news objection 
        let newsObj = {
            userId, 
            userPic: ""
        }

        let news = postUser.notifications.news

        // Like event
        if (event === "liked") {
            newsObj.newsDescription = `${user.name} ${event} your post`
            news.push(newsObj)
            postUser = await this.model.findOneAndUpdate({ _id: authorId }, { "notifications.news": [...news] })
            return
        } 

        // Comment event 
        newsObj.newsDescription = `${user.name} ${event} on your post`
        news.push(newObj)
        await this.model.findOneAndUpdate({ _id: authorId }, { "notifications.news": [...news] })

    }
}

module.exports = Users;
