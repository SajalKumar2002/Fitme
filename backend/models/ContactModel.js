const { model, Schema } = require("mongoose");

const ContactSchema = new Schema({
    email: String,
    message: String,
    subject: String
},
    { timestamps: true }
)

const ContactModel = model("Contact", ContactSchema);

module.exports = ContactModel;