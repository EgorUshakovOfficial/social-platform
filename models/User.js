const mongoose = require('mongoose'); 
const { Schema } = mongoose; 

// Session schema 
const sessionSchema = new Schema({
    token: { type: String }, 
    createdAt: { type: Date, default: Date.now }
})

// User schema 
const userSchema = new Schema({
    name: { type: String}, 
    email: { type: String}, 
    password: { type: String }, 
    refreshToken: {type: [sessionSchema]}
})

const User = mongoose.model("User", userSchema); 
const Session = mongoose.model("Session", sessionSchema); 

module.exports = {
    User,
    Session
}