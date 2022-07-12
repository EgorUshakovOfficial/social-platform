const mongoose = require('mongoose'); 

// Schema 
const { Schema } = mongoose;

const postSchema = new Schema({
    createdAt: { type: Date, default: Date.now},
    description: { type: String, isRequired: true },
    numLikes: { type: Number, default: 0 },
    numComments: { type: Number, default: 0 },
    authorId: {type: String}
}); 

module.exports = mongoose.model("Post", postSchema); 


