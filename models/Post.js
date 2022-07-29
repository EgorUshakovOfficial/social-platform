const mongoose = require('mongoose'); 

// Schema 
const { Schema } = mongoose;

// Like schema 
const likeSchema = new Schema({
    userName: { type: String },
    userId: {type: String}
})

// Post schema 
const postSchema = new Schema({
    createdAt: { type: Date, default: Date.now},
    description: { type: String, isRequired: true },
    likes: { type: [likeSchema], default: [] },
    comments: { type: [String], default: [] },
    authorId: {type: String}
}); 

module.exports = mongoose.model("Post", postSchema); 


