const { Router } = require("express");
const adminRouter = Router();

const {
    displayAdmin,
    addAdmin,
    updateAdmin,
    isAdmin
} = require("../controller/adminController");

//--------------------------------------------------------------------------------------------------------
adminRouter
    .get("/", displayAdmin)
    .get("/isadmin", isAdmin)
    .post("/add", addAdmin)
    .patch("/:adminID", updateAdmin)

//--------------------------------------------------------------------------------------------------------
module.exports = adminRouter;