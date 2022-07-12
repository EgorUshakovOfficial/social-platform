const { MongoDataSource } = require('apollo-datasource-mongodb'); 

class Users extends MongoDataSource {
    getUser(userId) {
        return this.findOneById(userId)
    }
}

module.exports = Users;
