const route = require("express").Router()
const Users = require('../users/users-model')
const doesUserExist = require('../middleware/doesUserExist')
const restrictPath = require('../middleware/restrictPath')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")


function generateToken(user){
    const payload = { username: user.username }
    const secret = process.env.JWT_SECRET
    const options = { expiresIn: '1hr' }
    return jwt.sign(payload, secret, options)
}

//after api/auth
route.post("/register", async (req, res, next) => {
    try {
        const { username, password } = req.body

        const user = await Users.findByFilter({ username }).first()
        if(user){
            return res.status(400).json({message: "Username already taken"})
        }

        if (!password){
            return res.status(400).json({message: "Please provide a password"})
        }

        await Users.createUser(req.body)
        res.status(201).json({
            message: `Welcome ${username}! Now go log in please!`
        })
    } catch(err){
        next(err)
    }
})


route.post("/login", doesUserExist(), async (req, res, next) => {
    try {
        const { username, password } = req.body
        const isPasswordValid = bcrypt.compare(password, req.user.password)

        if(!isPasswordValid){
            res.status(400).json({ message: "Please enter a valid password" })
        } else {
            const token = generateToken(req.user)
            res.cookie("authToken", token).json({ message: `Welcome ${username}` })
        }
    } catch(err){
        next(err)
    }
})

route.delete("/:id", restrictPath(), async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await Users.findById(id)
        if (!user) {
            return res.status(400).json({message: "User enter valid user id"})
        }
        await Users.delUser(id)
        res.json({message: "user has been deleted"})
    } catch(err){
        next(err)
    }
})

module.exports = route