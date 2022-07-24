const mongoose = require('mongoose'); 

// Schema 
const { Schema } = mongoose;

// Post schema 
const postSchema = new Schema({
    createdAt: { type: Date, default: Date.now},
    description: { type: String, isRequired: true },
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    authorId: {type: String}
}); 

module.exports = mongoose.model("Post", postSchema); 


