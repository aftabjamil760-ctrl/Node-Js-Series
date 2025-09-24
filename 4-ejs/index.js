import express from 'express'
const app = express()

app.set('view engine', 'ejs')
// for set your own file app.set('views', './my-template')

app.use(express.urlencoded({ extended: false}))
app.use(express.static('public')) // for styling file address
app.listen(3000, () => {
    console.log("server running on port 3000")
})
/*

app.post('/submit', (req, res) => {
    const name = req.body.myname
    const message = `Hello, ${name} you submitted the form.`
    res.render('form', {message: message})
})


app.post('/submit', (req, res) => {
    const name = req.body.myname
    const message = `Hello, ${name} you submitted the form.`
    res.send(message)
})



app.get('/form', (req, res) => {
    res.render('form')
})


var users = [
    {name: "salman", age: 24, city: 'multan'},
    {name: "ali", age: 25, city: 'lahore'},
    {name: "umar", age: 26, city: 'karachi'},
    {name: "ahmad", age: 27, city: 'islamabad'},
    {name: "zahid", age: 28, city: 'peshawar'},
]

app.get('/about', (req, res) => {
    let items = ['apple', 'banana', 'cherry', 'oragne']
    res.render("about", {
        title: 'home page',
        message: "welcome",
        items: users
    })
})

app.get('/', (req, res) => {
    res.send("<h1>home page</h1>")
})



print output in broswer use key
app.get('/about', (req, res) => {
res.render("about", {title:'about page', message: "welcom to ejs"}) // name of ejs file
})

*/