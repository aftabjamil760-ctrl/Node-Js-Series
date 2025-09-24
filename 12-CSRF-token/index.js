// const express = require('express');
// const app = express();

// const cookieParser = require('cookie-parser')
// const csrf = require("csrf");

// app.use(cookieParser('csurf'))
// const csrfProtection = csrf({ cookie : true})

//   //middleware
// app.set('view engine', 'ejs')
// app.use(express.json())
// app.use(express.urlencoded({ extended: false })) // middleware to accept form data
// app.use(express.static('public'))

// app.get('/', (req, res) => {
//     res.send('Home Page')
// })

// app.get('/myform',csrfProtection, (req, res) => {
//     res.render('myform', {csrfToken: req.csrfToken()})
// })


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const cookieParser = require('cookie-parser');
const Tokens = require('csrf');   // csrf package

const app = express();
const tokens = new Tokens();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

// Middleware to generate CSRF Token
app.use((req, res, next) => {
  let secret = req.cookies._csrfSecret;

  
  if (!secret) {
    secret = tokens.secretSync();
    res.cookie('_csrfSecret', secret); // secret کو cookie میں save کرو
  }

 
  req.csrfToken = tokens.create(secret);
  next();
});

// Home route
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Form route
app.get('/myform', (req, res) => {
  res.render('myform', { csrfToken: req.csrfToken });
});

// Form submit route
app.post('/submit', (req, res) => {
  const secret = req.cookies._csrfSecret;
  const token = req.body._csrf;
//   res.send(req.body)
  // Verify token
  if (tokens.verify(secret, token)) {
    res.send(`Form submitted successfully ✅. Name: ${req.body.name}`);
  } else {
    res.status(403).send('Invalid CSRF token ❌');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
