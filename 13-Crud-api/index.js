const express = require('express');
const app = express();
const studentRoutes = require('./routes/students.routes');
const multer = require('multer')
const { MulterError } = multer
const connectDB = require('./config/database');
connectDB
  //middleware
app.set('view engine', 'ejs')
//parse application /json
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // middleware to accept form data // without this ture data will not create in postman
app.use(express.static('public')) // urlencode middleware will above your middleware that you create /api/students
//parse application /x-www-form-urlendcoded
app.use('/api/students', studentRoutes)

// error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof MulterError) {
    return res.status(400).send(`Image Error: ${error.message} : ${error.code}`)
  } else if (error) {
    return res.status(500).send(`Something went wrong: ${error.message}`)
  }
  next()
})

app.get('/', (req, res) => {
    res.send('Home Page')
})




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

