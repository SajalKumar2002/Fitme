const { Router } = require("express");
const adminRouter = Router();

const { displayAdmin, addAdmin, updateAdmin, isAdmin } = require("../controller/adminController");

//--------------------------------------------------------------------------------------------------------
adminRouter.get("/", displayAdmin);
adminRouter.get("/isadmin", isAdmin);
adminRouter.post("/add", addAdmin);
adminRouter.patch("/:adminID", updateAdmin)

//--------------------------------------------------------------------------------------------------------
module.exports = adminRouter;