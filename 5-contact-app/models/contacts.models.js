import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const contactSchema =  mongoose.Schema({
    firstName: {
        type: String,
        
    },
    lastName: {
        type: String
        
    },
    email: {
        type: String
        
        
    },
    phone: {
        type: String
        
    },
    address: {
        type: String
    },
    company: {
        type: String
    }
});
// Pagination
contactSchema.plugin(mongoosePaginate)
const Contact = mongoose.model("Contact", contactSchema);
// module.exports = contact for require method imports
export default Contact
