const jwt = require('jsonwebtoken');
const { User } = require('../models/User'); 

exports.COOKIE_OPTIONS = {
    httpOnly: true, 
    signed:true,
    secure: true, 
    maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
    sameSite: "none"
}

exports.getToken = user => {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: eval(process.env.SESSION_EXPIRY)
    })
}

exports.getRefreshToken = user => {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY)
    })

    return refreshToken
}

exports.getUser = async token => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        let user = await User.findById(payload._id)
        if (user === null) { return null }
        delete user.refreshToken
        return user
    } catch (err) {
       return null
    }

}

