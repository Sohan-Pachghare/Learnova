
const jwt = require('jsonwebtoken');
const User = require('./models/user');

const auth =   (req, res, next) => {
    try{
        const token = req.headers.token;
        const decodedToken =  jwt.verify(token, process.env.JWT_USER_KEY);
        req.userId = decodedToken.id;
        next();
    } catch(e) {
        console.log("Error in Auth\n" + e);
        res.send("Access denied!");
    }
}

const adminAuth = async (req, res, next) => {
    try{
        const token = req.headers.token;
        const decodedToken =  jwt.verify(token, process.env.JWT_USER_KEY);
        const admin = await User.findById(decodedToken.id);
        if(admin && admin.role === "admin") {
            req.userId = decodedToken.id;
            console.log("Admin authenticated");
            next();
        } else {
            res.send("Access denied! You are not an admin.");
        }
    } catch(e) {
        console.log("Error in Admin Auth\n" + e);
        res.send("Access denied!");
    }
}

module.exports = {
    auth: auth,
    adminAuth: adminAuth,
}