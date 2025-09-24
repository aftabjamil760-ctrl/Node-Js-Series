import Contact from "../models/contacts.models.js" // import method need .js
import mongoose from "mongoose";

    export const getContacts = async (req, res)=>{
    //Pagination
      try {
        // object destructing
        const { page = 1, limit = 3 } = req.query
        const options = {
          page: parseInt(page),
          limit: parseInt(limit)
        }
        const result = await Contact.paginate({}, options)
        // res.send(result)
        //error handling
        // const contacts = await Contact.find();  // MongoDB se data fetch
        // res.json(contacts); // Debugging ke liye use kar sakte ho
        return res.render('home', {
          "totalDocs": result.totalDocs,
          "limit": result.limit,
          "totalPages": result.totalPages,
          "currentpage": result.page,
          "Counter": result.pagingCounter,
          "hasPrevPage": result.hasPrevPage,
          "hasNextPage": result.hasNextPage,
          "prevPage": result.prevPage,
          "nextPage": result.nextPage,
          contacts: result.docs

          // res.json(contact)
        })
      } // home.ejs ko data bhejna
 
  catch(error){
    return res.render("500", {message: error})
  }
}
// above home page pagination

//show contact
export const getContact = async (req, res) => {
  //error handling
  // var paramId = mongoose.Types.ObjectId.isValid(req.params.id)
 if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
   return res.render('404', { message: "Invalid Id" });
}

  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) { return res.render('404', { message: "Contact not found." }); }
  return res.render('show-contact', {contact})
  // res.json(contact)
}
  catch(error){
    return res.render("500", {message: error})
  }
}


export const addContactPage = (req, res) => { // save the form
  
  // res.send(req.body)// use to accept form data
  return res.render('add-contact')
}

export const addContact = async (req, res) => { // save the form
  try {
    await Contact.create(req.body)
  // res.send(req.body)// use to accept form data
  return res.redirect("/")
}
  catch(error){
    return res.render("500", {message: error})
  }
}
  

export const updateContactPage = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.render('404', { message: "Invalid Id" });
  }
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) { return res.render('404', { message: "Contact not found." }); }
    return res.render('update-contact', { contact })
  
  }
  catch (error) {
    return res.render("500", { message: error })
  }
}
export const updateContact = async (req, res) => {
   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
   return res.render('404', { message: "Invalid Id" });
  }
  try {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body) // update or edit data
    if (!contact) { return res.render('404', { message: "Contact not found." }); }
    return res.redirect('/')
  
  }
  catch (error) {
   return res.render("500", { message: error })
  }
}
  // const { firstName, lastName, email, phone, address, company } = req.body
  //   await Contact.findByIdAndUpdate(req.params.id, { firstName, lastName, email, phone, address, company }) // update or edit data

  

export const deleteContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
   return res.render('404', { message: "Invalid Id" });
  }
  try {
   const contact =  await Contact.findByIdAndDelete(req.params.id)
    if (!contact) { return res.render('404', { message: "Contact not found." }); }
     return res.redirect('/')
  
  }
  catch (error) {
   return res.render("500", { message: error })
  }
}
 

