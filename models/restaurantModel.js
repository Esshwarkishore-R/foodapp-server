const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    restaurant_name: { type: String, require },
    place: { type: String, require },
    average_price: { type: String, require },
    cuisine: { type: String, require },
    image: { type: String, require },
    description: { type: String, require },
    famous_foods: [],
},
    {
        timestamps: true,
    }
)

const restaurantModel = mongoose.model('restaurants', restaurantSchema)

module.exports = restaurantModel