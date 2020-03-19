const express = require("express")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const authRoutes = require('./auth/auth-route')
const usersRoutes = require('./users/users-route')
const contactRoutes = require('./contactInfo/contactInfo-routes')


const server = (express())
const PORT = 4000

server.use(helmet())
server.use(express.json())
server.use(cookieParser())

server.use("/api/auth", authRoutes)
server.use("/api/users", usersRoutes)
server.use("/api/contacts", contactRoutes)


server.use('/', (err, req, res, next) => {
    console.log('ERROR: ', err)
    res.status(500).json("Something went wrong")
})

server.listen(PORT, console.log(`Server is running on port ${PORT}`))