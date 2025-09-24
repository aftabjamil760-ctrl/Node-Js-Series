const express = require('express');
const app = express();

const {body, validationResult} = require("express-validator")


  //middleware
app.set('view engine', 'ejs') // views file
app.use(express.json()); // for api
app.use(express.urlencoded({ extended: false })) // middleware to accept form data
app.use(express.static('public')) //public file

var validationRegistration = [
    body('username')
        .notEmpty().withMessage("username is required")
        .isLength({ min: 3 }).withMessage("username must be at least 3 characters long.")
        .trim()
        .isAlpha().withMessage("usernaem must contain only letters.")
        .custom(value => {
            if (value === 'admin') {
                throw new Error('username "admin" is not allowed.')
            }
            return true
        })
        // .customSanitizer(value=> {
        //  return value.toLowerCase // 
        // })
        .toLowerCase()
        .normalizeEmail(),
        
    body('useremail')
       .isEmail().withMessage("please provide a valid email Id."), 
    body('userpass')
        .isLength({ min: 5, max: 10 }).withMessage("username must be between 5 and 10 character long.")
        .isStrongPassword().withMessage("password must be strong"),
    
    body('userage')
    .isNumeric().withMessage("Age must be numeric.")
        .isInt({ min: 18 }).withMessage("age must be as least 18 years old."),
    
    body('usercity')
        .isIn(["Multan", "karachi", "Lahore", "Isalamabad"])
    .withMessage("city must be Multan, Lahore, Karachi, Isalamabad")
]

app.get('/myform', (req, res) => {
res.render('myform', { errors: 0 })
})

// Support visiting /saveform via GET (show the form)
app.get('/saveform', (req, res) => {
    return res.render('myform', {errors: 0});
})

app.post('/saveform', validationRegistration, (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()){
        return res.send(req.body)
    }
    res.render("myform", {errors: errors.array()})
   
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
