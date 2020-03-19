const route = require("express").Router()
const Users = require('./users-model')
const restrictPath = require('../middleware/restrictPath')


//after /api/users
route.get("/", restrictPath(), async (req, res, next) => {
    try {
        const users = await Users.findAll()
        res.json(users)
    } catch(err){
        next(err)
    }
})


module.exports = route