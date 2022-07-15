import { MongoDataSource } from 'apollo-datasource-mongodb'; 

class MongoAPI extends MongoDataSource {
    constructor() {
        super(); 
    }

    getUser(userId) {
        return this.findOneById(userId); 
    }

    getPosts() { }

}