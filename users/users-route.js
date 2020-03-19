const route = require("express").Router()
const Users = require('./users-model');


//after /api/users
route.get("/", async (req, res, next) => {
    try {
        const users = await Users.findAll()
        res.json(users)
    } catch(err){
        next(err)
    }
})


module.exports = route