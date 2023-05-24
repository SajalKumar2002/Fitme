const ContactModel = require("../models/ContactModel");

const postMessage = async (req, res) => {
    try {
        const newcontact = new ContactModel({
            email: req.body.email,
            message: req.body.message,
            subject: req.body.subject
        });
        newcontact.save()
        return res.json({ success: true });
    } catch (error) {
        console.error(error);
        return res.json({ success: false });
    }
};

const displayContact = async (req, res) => {
    try {
        const contact = await ContactModel.find({});
        if (contact) {
            return res.status(200).send(contact);
        }
        else {
            return res.status(400).send({ message: "Service Error" });
        }
    } catch (error) {
        console.error(error);
        return res.send("Service Error");
    }
};

const deleteContact = async (req, res) => {
    try {
        await ContactModel.findOneAndDelete({ _id: req.params.id });
        return res.json({ success: true })
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Service Error" })
    }
};

module.exports = { postMessage, displayContact, deleteContact };