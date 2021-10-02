const express = require('express')
const router = express.Router();
const Food = require('../models/foodModel')
const Restaurant = require('../models/restaurantModel');
const auth = require('./auth');


router.get('/getAllFood', auth, async (req, res) => {

    try {
        const data = await Food.find({})
        res.send(data)
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.get('/getAllRestaurant', auth, async (req, res) => {

    try {
        const data = await Restaurant.find({})
        res.send(data)
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
});



module.exports = router
