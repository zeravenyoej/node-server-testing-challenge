const db = require("../data/config")

module.exports = {
    findAll,
    findByFilter,
    findById,
    createUser, 
    delUser,
}

function findAll(){
    return db("users").select("username")
}

function findByFilter(filter){
    return db("users").where(filter)
}

function findById(id) {
    return db("users").where("id", id).first()
}

function createUser(payload) {
    return db("users").insert(payload)
}

function delUser(id){
    return db("users").where("id", id).del()
}