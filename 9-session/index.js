const express = require('express');
const app = express();

//npm install connect-mongo to store session in database instead of memory
const MongoStore = require('connect-mongo')
const session = require('express-session')
app.use(session({
    secret: 'secretpassword',
    resave:  false,
    saveUninitialized: false,
store: MongoStore.create({
    mongoUrl: "mongodb+srv://aftabjamil793:HAQO8Tpxf4HZzhdr@cluster0.5ooaiii.mongodb.net/sessiondb?retryWrites=true&w=majority",
    collectionName: 'mysessions'
    // ttl : 1000 * 60 * 60 *24 time set when use connect-mongo
}),    cookie:{maxAge: 1000 * 60 * 60 *24}
}))
app.get('/', (req, res) => {
     if (req.session.username) {
       res.send(`username from session is : ${req.session.username}`)
    }
    else {
        res.send('NO username found in session.')
    }
})


app.get('/set-username', (req, res) => {
    req.session.username = "yahubaba"
    res.send('username has been set in session.') // http://localhost:3000/set-username without set-username in broswer session will not create in mongoshell
})

app.get('/get-username', (req, res) => {
    if (req.session.username) {
        res.send(`username from session is : ${req.session.username}`) // read session
    }
    else {
        res.send('NO username found in session.')
    }
})
   
//destory session
app.get('/destory', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
           res.status(500).send("failed to destroy session")
        }
        res.send('session destory successfully')
   })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

