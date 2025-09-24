import express from "express"
import Contact from "../models/contacts.models.js";
import { getContacts, getContact, addContact, addContactPage, deleteContact, updateContact, updateContactPage }
  from "../controller/contact.controller.js";
const router = express.Router() // when use router replace it with app
// Routes
router.get('/', getContacts)
// eslint-disable-next-line no-unused-vars


router.get('/show-contact/:id', getContact)

router.get('/add-contact', addContactPage)
router.post('/add-contact', addContact)

router.get('/update-contact/:id', updateContactPage)
router.post('/update-contact/:id', updateContact)

router.get('/delete-contact/:id', deleteContact)
export default router