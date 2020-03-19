const route = require("express").Router()
const restrictPath = require("../middleware/restrictPath.js")
const doesUserExist = require('../middleware/doesUserExist')
const db = require('./contactInfo-module');

//after /api/contacts
route.get('/', restrictPath(), async (req, res, next) => {
    try{
        const contacts = await db.getAllContacts()
        res.json(contacts)
    } catch(err){
        next(err)
    }
})


route.get('/:id', restrictPath(), async (req, res, next) => {
    try{
        const { id } = req.params
        const contact = await db.getContactById(id)
        res.json(contact)
    } catch(err){
        next(err)
    }
})


route.post('/', doesUserExist(), restrictPath(), async (req, res, next) => {
    try{
        await db.createContact(req.body)
        res.status(201).json(`Contact info updated for ${req.body.username}`)
    } catch(err){
        next(err)
    }
})


module.exports = route