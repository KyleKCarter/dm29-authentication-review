const bcrypt = require('bcryptjs')

//register
const register = async(req, res) => {
    const { username, password /*, email, firstName, lastName, phoneNumber */ } = req.body
    const db = req.app.get('db')
    const checkedUser = await db.auth.checkForUser(username);
    if(checkedUser[0]) {
        res.status(409).json("Try again dumb dumb")
    } else {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const registeredUser = await db.auth.registerUser([username, hash])
        const user = registeredUser[0]
        req.session.user = {
            username: user.username
            // firstName: user.firstName,
            // lastName: user.lastName,
            // email: user.email
        }
        res.status(200).json(req.session.user)
    }
}

//login
const login = async(req, res) => {
    const {username, password} = req.body;
    const db = req.app.get('db')
    const user = await db.auth.loginUser(username)
    console.log(user)
    if(!user[0]) {
        return res.status(400).json('username or password not found')
    }
    const authenticated = bcrypt.compare(password, user[0].password)
    if(!authenticated) {
        return res.status(400).json('incorrect username or password')
    }
    req.session.user = {
        username: user[0].username,
        // firstName: user.firstName,
        // lastName: user.lastName,
        // email: user.email
    }
    console.log(req.session)
    return res.status(200).json(req.session.user)
}

//logout
const logout = (req, res) => {
    req.session.destroy()
    console.log(req.session)
    return res.sendStatus(200)
}

module.exports = {
    register,
    login,
    logout
}