const express = require('express');
const app = express();
const session = require('express-session')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('./model/user.model')
//Database connection
mongoose.connect('mongodb+srv://aftabjamil793:HAQO8Tpxf4HZzhdr@cluster0.5ooaiii.mongodb.net/user-crud?retryWrites=true&w=majority')
.then(() => console.log('connected!'))

  //middleware
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false })) // middleware to accept form data
app.use(express.json())
app.use(express.static('public'))

app.use(session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: false
}))

let checkLogin = (req, res, next) => {
    if (req.session.user) {
        next()
    }
    else {
        res.redirect('login')
    }
}

//Routes
app.get('/',checkLogin, (req, res) => {
    return res.send(`<h1>Home Page</h1> <p>Hello, ${req.session.user}</p> <a href="/logout">Logout</a>`);
});

app.get('/profile',checkLogin, (req, res) => {
    return res.send(`<h1>Profile Page</h1> <p>Hello, ${req.session.user}</p><a href="/logout">Logout</a>`);
});


app.get('/login', (req, res) => {
    if (req.session.user) {
        res.redirect('/')
    } else {
       return res.render('login', {error: null})
    }
    return res.render('login', {error: null});
});

app.get('/register', (req, res) => {
    return res.render('register', {error: null});
});
app.post('/register',async (req, res) => {
    const { username, userpassword } = req.body
    const hashedPassword = await bcrypt.hash(userpassword, 10) //async

    // res.send({username, userpassword: hashedPassword})
    await User.create({ username, userpassword: hashedPassword })
    res.redirect('/login')
})

app.post('/login', async (req, res) => { 
    const { username, userpassword } = req.body
    const user = await User.findOne({ username })
    if (!user) return res.render('login', { error: 'user not found' })
    const isMatch = await bcrypt.compare(userpassword, user.userpassword)
        if (!isMatch) return res.render('login', { error: 'Invalid Password' })
   //session
    req.session.user = username
    res.redirect('/')
})
//session
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

