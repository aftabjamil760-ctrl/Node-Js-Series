const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/users.models')


app.use(cors());
app.use(express.json())
app.use(express.static('public'))

mongoose.connect('mongodb+srv://aftabjamil793:HAQO8Tpxf4HZzhdr@cluster0.5ooaiii.mongodb.net/users_demo?retryWrites=true&w=majority')
    .then(() => console.log('Database connected!'))

//get all users
app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json({ data: users });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
