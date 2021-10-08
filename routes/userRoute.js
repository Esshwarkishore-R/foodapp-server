const express = require('express');
const router = express.Router();
const User = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const jwtSecret = "food_application_esshwar";
const log = require('log-beautify');
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
    const { email, password } = req.body;
    if (email && password) {
        User.findOne({ email }, (error, resultUser) => {
            console.log("🚀 ~ file: userRoute.js ~ line 53 ~ User.findOne ~ resultUser", resultUser)
            if (error) {
                res.status(500).json({ message: 'Internal Server Error' });
            } else if (resultUser) {

                bcrypt.compare(password, resultUser.password, (error, success) => {
                    if (error) {
                        res.status(500).json({ message: 'Internal Server Error' });
                    } else if (success) {
                        let token = jwt.sign(
                            { id: resultUser._id },
                            jwtSecret,
                            {
                                expiresIn: '1h'
                            }
                        );
                        log.success('sucesfullt verified the pwd');
                        res.status(200).json({
                            message: 'Success',
                            token: token,
                            email: resultUser.email,
                            name: resultUser.name
                        });
                    } else {
                        log.warn('invalid creds')
                        res.status(409).json({ message: 'Invalid Credentials' });
                    }
                });

            } else {
                res.status(409).json({ message: 'Invalid Credentials' });
            }
        });
    } else {
        res.status(401).json({ message: 'Please enter valid Credentials' });
    }


});

module.exports = router