const mongoose = require('mongoose'); 

// Schema 
const { Schema } = mongoose;

// Like schema 
const likeSchema = new Schema({
    userName: { type: String },
    userId: {type: String}
})

// Comment schema 
const commentSchema = new Schema({
    userId: { type: String },
    userName: { type: String },
    comment: { type: String },
}); 

// Post schema 
const postSchema = new Schema({
    createdAt: { type: Date, default: Date.now},
    description: { type: String, isRequired: true },
    likes: { type: [likeSchema], default: [] },
    comments: { type: [commentSchema], default: [] },
    authorId: {type: String}
}); 

module.exports = mongoose.model("Post", postSchema); 


