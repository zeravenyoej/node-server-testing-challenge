const db = require('../data/config')

module.exports = {
    getAllContacts,
    getContactById,
    createContact
}

function getAllContacts(){
    return db("users as u")
        .join("contactInfo as c", "c.user_id", "u.id")
        .select("u.username", "c.phoneNumber", "c.email")
}


function getContactById(id){
    return db("users as u")
        .join("contactInfo as c","u.id", "c.user_id")
        .where("u.id", id)
        .select("u.username", "c.phoneNumber", "c.email")
}

function createContact(payload){
    const updatedPayload = {
        user_id: payload.user_id,
        email: payload.email,
        phoneNumber: payload.phoneNumber
    }
    return db("contactInfo").insert(updatedPayload)
}