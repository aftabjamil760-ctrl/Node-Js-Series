
import express from "express"
const app = express()
import ContactRoutes from "./routes/contacts.routes.js";
import connectDB from "./config/database.js";
//database connection
connectDB()

const PORT  = process.env.PORT 


  //middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false })) // middleware to accept form data
app.use(express.static('public'))

//Routes

app.use("/", ContactRoutes)



// start server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}.`)
})

