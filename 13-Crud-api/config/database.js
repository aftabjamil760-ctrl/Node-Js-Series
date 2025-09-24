const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = mongoose.connect('mongodb+srv://aftabjamil793:HAQO8Tpxf4HZzhdr@cluster0.5ooaiii.mongodb.net/students-crud?retryWrites=true&w=majority')
.then(()=> console.log(`Connted to MongoDB`))
.catch(err => console.log(err))