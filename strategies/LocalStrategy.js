const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy; 
const bcrypt = require('bcrypt'); 
const { User } = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: "email", 
    passwordField: "password"
}, (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
        if (err) { return done(err); }
        if (user === null) { return done(null, false); }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {return done(err); }
            if (result === false) { return done(null, false); }
            return done(null, user); 
        })
    })
}))

passport.serializeUser((user, done) => {
    return done(null, user._id); 
})