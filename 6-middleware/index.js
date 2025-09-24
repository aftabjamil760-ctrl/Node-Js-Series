const express = require('express');
const app = express();

const router = express.Router()




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
/*
third party middleware
 cookies passport etc...

Built-in Middleware

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false })) // middleware to accept form data
app.use(express.static('public'))

res.json

Router middleware
router.use((req, res, next) => {
    const d = new Date()
               console.log(`Time : ${d.getHours()} / ${d.getMinutes()}`) //Time : 15 / 15
    next()
})
app.get('/', (req, res) => {
    res.send('Home Page');
});
app.get('/about',  (req, res) => {
    res.send('About Page');
});

404 page contain only req, res middleware
app.use((req, res) => {
    res.send("<h1>Error 404 page not found </h1>")
})
//error router
app.use((err, req, res, next) => {
    const d = new Date()
    console.error(err.stack) 
    res.status(500("something broke!"))
    next()
})
app.use('/test', router) //http://localhost:3000/test router middleware for name
           console.log(`Date : ${d.getDate()} / ${d.getMonth()}`) // Date : 16 / 8
       console.log(`${req.method} ${req.url}`) // GET /about


application middleware
app.use(req, res, next)...
const mymiddleware = ((req, res, next) => {
    const d = new Date()
               console.log(`Time : ${d.getHours()} / ${d.getMinutes()}`) //Time : 15 / 15

        //    console.log(`Date : ${d.getDate()} / ${d.getMonth()}`) // Date : 16 / 8
       //console.log(`${req.method} ${req.url}`) // GET /about

    // console.log('hello from middlware')
    //    console.log(`${req.method} ${req.url}`) // GET /about
    next()
})
const myothermiddleware = ((req, res, next) => {
    const d = new Date()
               console.log(`Time : ${d.getHours()} / ${d.getMinutes()}`) //Time : 15 / 15
    next()
})
//app.use(mymiddleware) work for all route
app.get('/', mymiddleware ,(req, res) => {
    res.send('Hello World');
});
app.get('/about', myothermiddleware, (req, res) => {
    res.send('About Page');
});
*/

