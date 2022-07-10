const {
    getToken,
    getRefreshToken,
    COOKIE_OPTIONS
} = require('./utils/authenticate'); 
const passport = require('passport'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken')

module.exports = (app, User, Session) => {
    app.post('/login',
        passport.authenticate('local', {
            session: false
        }),
        (req, res, next) => {
            if (req.user === undefined) {
                res.statusCode = 401
                return res.send("Unauthorized")
            }
            next()
        },
        (req, res) => {
            let { user } = req
            let token = getToken({ _id: user._id })
            let refreshToken = getRefreshToken({ _id: user._id })

            // Set refresh token as http-only cookie 
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
            res.cookie("connect-sid", "", {
                signed: true,
                maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
            })

            // Create session and save it to database 
            User.findById(user._id)
                .then(async user => {
                    let session = new Session({ token:refreshToken })
                    user.refreshToken.push(session)
                    await user.save()
                    return res.json({ token })
                })
                .catch(err => {
                    res.send(err)
                })
        }
    )

    app.post('/logout', async (req, res) => {
        const { signedCookies = {} } = req
        const { refreshToken } = signedCookies 

        try {
            let payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            await User.findById(payload._id)
                .then(async user => {
                    let index = user.refreshToken.findIndex(obj => obj.token === refreshToken)
                    if (index !== -1) {
                        user.refreshToken.splice(index, 1)
                        await user.save()
                    }
                    res.clearCookie("refreshToken")
                    res.clearCookie("connect-sid")
                })
        } catch (err) {
            console.log(err)
        }

        finally {
            return res.json({token:""})
        }
    })

    app.post('/register', async (req, res) => {
        const {
            name,
            email,
            password
        } = req.body

        let user = await User.findOne({ email })

        if (user !== null) {
            return res.json({
                success: false,
                message: "Error! Email is already registered with another account"
            })
        }

        // Hash password
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt)

        // Create new user 
        user = new User({
            name,
            email,
            password: hash
        })

        // Save new user 
        user.save()
            .then(newUser => {
                return res.json({
                    success: true,
                    message: "User is successfully registered and may now log in"
                })
            })
            .catch(err => {
                return res.send(err)
            })


    })

    app.post('/refreshToken', async (req, res) => {
        const { signedCookies = {} } = req
        const { refreshToken } = signedCookies
        try {
            let payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            const { _id } = payload
            User.findById(_id)
                .then(async user => {
                    let index = user.refreshToken.findIndex(obj => obj.token === refreshToken)
                    if (index === -1) {
                        res.statusCode = 401
                        return res.send("Unauthorized")
                    }

                    let token = getToken({ _id: user._id })
                    //let newRefreshToken = getRefreshToken({ _id: user._id })
                    //user.refreshToken[index] = new Session({ token:newRefreshToken }) // Debug here 
                    //await user.save()
                    return res.json({token})

                })
        } catch (err) {
            res.statusCode = 401
            return res.send("Unauthorized")
        }

    })
}