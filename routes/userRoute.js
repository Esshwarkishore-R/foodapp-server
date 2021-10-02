const express = require('express');
const router = express.Router();
const User = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const jwtSecret = "food_application_esshwar";

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'please enter all fields' })
    }
    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({ message: 'This user is already exist' })
            }
            else {
                const newUser = new User({ name, email, password })
                //Creating the Salt
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                jwt.sign({
                                    id: user.id
                                },
                                    (jwtSecret), { expiresIn: 3600 },
                                    (err, token) => {
                                        if (err) throw err;
                                        res.json({
                                            token,
                                            user: {
                                                id: user.id,
                                                name: user.name
                                            }
                                        })
                                    }
                                )
                            })
                    })
                })
            }
        })

});
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.find({ email, password })
        if (user.length > 0) {
            // res.send('User Logged in successfully')
            const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: 3600 });
            if (!token) throw Error('Couldnt sign the token');
            const currentuser = {
                name: user[0].name,
                email: user[0].email,
                _id: user[0]._id
            }
            res.send({ user, token });
        }
        else {
            return res.status(400).json({ message: 'User Login Failed' })
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Something went wrong' })
    }
});

module.exports = router