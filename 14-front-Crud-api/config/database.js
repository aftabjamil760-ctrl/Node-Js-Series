const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://aftabjamil793:HAQO8Tpxf4HZzhdr@cluster0.5ooaiii.mongodb.net/students-crud?retryWrites=true&w=majority')
    console.log("✅ Connected to MongoDB")
  } catch (err) {
    console.error("❌ MongoDB connection error:", err)
    process.exit(1)
  }
}

module.exports = connectDB
