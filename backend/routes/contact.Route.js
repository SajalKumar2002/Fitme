const { Router } = require("express");
const { postMessage, displayContact, deleteContact } = require("../controller/contactController");
const contactRouter = Router();

//--------------------------------------------------------------------------------------------------------
contactRouter.post("/", postMessage);
contactRouter.get("/", displayContact);
contactRouter.delete("/:id", deleteContact)

//--------------------------------------------------------------------------------------------------------
module.exports = contactRouter;