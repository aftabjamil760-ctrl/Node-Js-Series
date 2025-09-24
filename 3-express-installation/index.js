const express = require('express');
const app = express();

//methods of express
//method start or listen server
app.listen(3000, () => {
    console.log('server running on port 3000')
});
app.set('view engine', 'ejs');

//use to send json data or middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))// for send form data

/*
Method of Request:
app.post('/about', (req, res) => {
    if (req.is('application/json')) { // show html broswer only
        res.send("validation json data")
    }
    else if (req.is('text/html')) {
        res.send('html')
    }
    
    else {
        res.send(400).send("unsupported content")
    }
    
})

app.get('/about', (req, res) => {
    res.send(req.get(Accept)) 
})

app.get('/about', (req, res) => {
    res.send(req.get("Connection")) 
})

app.get('/about', (req, res) => {
    res.send(req.headers.host) 
})

app.get('/about', (req, res) => {
    res.send(req.headers) 
})

app.get('/about', (req, res) => {
    if (req.accepts('html')) { // show html broswer only
        res.send("<h1> Hello Html</h1>")
    }
    else if (req.accepts('json')) {
        res.send({message: 'hello json'})
    }
    else if (req.accepts('xml')) {
        res.send('<message> hello xml </message>')
    }
    else {
        res.send('content type not supported.')
    }
    
})

Properties of Request :

app.get('/about', (req, res) => {
    res.send(req.route) 
})

app.get('/about', (req, res) => {
    res.send(req.secure) 
})
app.get('/about', (req, res) => {
    res.send(req.protocol) 
})

app.get('/about', (req, res) => {
    res.send(req.path) 
})

app.get('/about', (req, res) => {
    res.send(req.originalUrl) 
})

app.get('/about', (req, res) => {
    res.send(req.method) 
})

app.get('/about', (req, res) => {
    res.send(req.ips) 
})

app.get('/about', (req, res) => {
    res.send(req.ip) 
})
app.get('/about', (req, res) => {
    res.send(req.hostname) 
})
send data to server
app.post('/about', (req, res) => {
    res.send(req.body) // read json or form data
})

app.get('/', (req, res) => {
    res.send('Hello World 24')
})
app.get('/about', (req, res) => {
    res.send('Hello World')
})

Response Method:



app.get('/check', (req, res) => {
    
    res.set('custom-header', 'hello')
    console.log(res.get(custom-header))
    res.send("header set")
})


app.get('/check', (req, res) => {
    console.log(res.headerSent)
    res.status('200').send('hello')
    console.log(res.headerSent)
    
})

app.get('/error', (req, res) => {
    res.sendStatus('200').send('hello')
    
})

app.get('/error', (req, res) => {
    res.sendStatus('402')
    
})

app.get('/error', (req, res) => {
    res.sendStatus('404')
    
})

app.get('/end', (req, res) => {
    res.write('this is testing')
    res.end()
})


app.get('/download', (req, res) => {
    res.sendFile( __dirname + './files/Python Basic Program.pdf') //in views directory
})


app.get('/download', (req, res) => {
    res.download('./files/Python Basic Program.pdf', 'document.pdf') //in views directory
})


app.get('/user', (req, res) => {
    res.render('user') //in views directory
})

app.get('/', (req, res) => {
    res.jsonp({ name: 'yahubaba', age: 25}) //http://localhost:3000/?callback=myfunction
})
app.get('/about', (req, res) => {
    res.redirect(301, '/user'); //301 permanent redirection
})
app.get('/about', (req, res) => {
    res.redirect(301, '..'); //return recently website that you open
})
app.get('/user', (req, res) => {
    res.send('hello world')
})

return json inside function
app.get('/', (req, res) => {
    res.jsonp({ name: 'yahubaba', age: 25}) //http://localhost:3000/?callback=myfunction
})

return object
app.get('/', (req, res) => {
    const users = [ //array of object
        {id: 1, name: 'salman'},
        {id: 2, name: 'ali'}
    ]
    res.send(users)
})
//return array
app.get('/', (req, res) => {
    res.send([
        'apple', 'banana', 'Mango' // give output same
    ])
})


 Routing 
//about route
app.get('/about', (req, res) => {
    res.send('hello world!')
})
//gallery route
app.get('/gallery', (req, res) => {
    res.send('picher ')
})
//if error cannot get means route is not

app.get('/random.text', (req, res) => {
    res.send('hello world!p')
})
//Pass value through route parameters
app.get('/about/:id', (req, res) => {
    res.send(req.params) //http://localhost:3000/about/12
})
// nested route
app.get('/user/:userid/book/:bookid', (req, res) => {
    res.send(req.params) //http://localhost:3000/user/10/book/22
})
//params sub method
app.get('/user/:userid/book/:bookid', (req, res) => {
    res.send(req.params.userid) //http://localhost:3000/user/10/book/22
})
app.get('/user/:userid-:bookid', (req, res) => {
    res.send(req.params.userid) //http://localhost:3000/user/10-:22
})
//media queres
app.get('/search', (req, res) => {
    res.send(req.query)
    //http://localhost:3000/search?name=yahubaba
    //http://localhost:3000/search?name=yahubaba&age=20&city=multan
})
app.get('/search', (req, res) => {
    const name = req.query.name
    const age = req.query.age

    res.send(`Search results for Name : ${name}, Age :${age}`)
    
})
    */