const jwt = require("jsonwebtoken")

module.exports = function restrictPath(){
    return async (req, res, next) => {
        const { authToken } = req.cookies
        if (!authToken){
            return res.status(400).json({message: "No credentials provided"})
        } 

        jwt.verify(authToken, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err){
                res.status(401).json({ message: "this is restricted to you" })
            } else {
                req.decodedToken = decodedToken
                next()
            }
        })
    }
};
