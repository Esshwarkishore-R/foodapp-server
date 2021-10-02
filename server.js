const express = require('express')
const db = require('./db')
const app = express()
app.use(express.json());
const cors = require('cors');
const Food = require('./models/foodModel')
const foodroute = require('./routes/foodRoute')
const userRoute = require('./routes/userRoute')
app.use(cors());
app.get('/', (req, res) => res.send('Server Running!'))
app.use('/api/food/', foodroute)
app.use('/api/users/', userRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Running on port port!`))