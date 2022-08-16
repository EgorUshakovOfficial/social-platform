const mongoose = require('mongoose'); 
const { Schema } = mongoose; 

// Session schema 
const sessionSchema = new Schema({
    token: { type: String }, 
    createdAt: { type: Date, default: Date.now }
})

// News Schema 
const newsSchema = new Schema({
    userPic: {type:String, default:""},
    newsDescription: {type: String, default: ""}
})

// Like schema 
const notificationSchema = new Schema({
    news: { type: [newsSchema], default: []}, 
    isOpened: {type: Boolean, default: false}
})

// User schema 
const userSchema = new Schema({
    name: { type: String}, 
    email: { type: String}, 
    password: { type: String }, 
    refreshToken: { type: [sessionSchema] }, 
    notifications: {type: notificationSchema }
})

const User = mongoose.model("User", userSchema); 
const Session = mongoose.model("Session", sessionSchema); 

module.exports = {
    User,
    Session
}