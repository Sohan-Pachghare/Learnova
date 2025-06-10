const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 5, async(err, result) => {
        if(!err) {
            try{
                await User.create({
                    name: name,
                    email: email,
                    password: result
                });
                res.send("SignUp successful!");
            } catch(e) {
                console.log(e);
                res.status(500).send("Something went wrong");
            }
        } else {
            console.log("error in hashing\n"+ err);
            res.status(500).send("Something went wrong!");

        }
    });
});


router.post('/login', async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({email});
    bcrypt.compare(password, user.password, (err, result) =>{
        if(!result) {
            res.status(404).send("Access Denied.")
        }
        res.send("Welcome back!")
    })
});

router.post('/purchase', async (req, res) => {
    const {courseName, } = req.body;

});

router.get('/courses', async (req, res) => {
    const courses = Courses.find();
});

module.exports = router;