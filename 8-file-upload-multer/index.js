const express = require('express');
const app = express();

const multer = require('multer')
const path = require('path')

  //middleware
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // middleware to accept form data
app.use(express.static('public'))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
    
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now() + path.extname(file.originalname)
     cb(null, newFileName) // not use 'newfilename'
  }
})
// only image file are allowed

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'userfile') {
    // sirf images allow
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG or PNG images are allowed'), false);
    }
  } else if (file.fieldname === 'userdocuments') {
    // sirf pdf allow
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF documents are allowed'), false);
    }
  } else {
    cb(new Error('Unknown field'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,

  }, 
  
  fileFilter : fileFilter
})

app.get('/', (req, res)=> {
  res.render('form')
})

// app.post('/submitform', upload.array('userfile', 3), (req, res) => { //upload.single
//   if (!req.files || req.files.length === 0) { //file for single file
//     return res.status(400).send(`No file uploaded.`)
//   }
//   res.send(req.files) // req.filename for only filename and file for single file
// })
// multipel forms fields
app.post('/submitform', upload.fields([
  { name :'userfile', maxCount: 1 },
    {name :'userdocuments', maxCount:3}

]), (req, res) => { //upload.single
  if (!req.files || req.files.length === 0) { //file for single file
    return res.status(400).send(`No file uploaded.`)
  }
  res.send(req.files) // req.filename for only filename and file for single file
})


app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === `LIMIT_UNEXPECTED_FILE`) {
      return res.status(400).send(`Error: Too many files uploaded`)
    }
    return res.status(400).send(`Multer error: ${error.message} : ${error.code}`)
  } else if(error) {
        return res.status(500).send(`Something went wrong: ${error.message}`)

  }
  next()
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

