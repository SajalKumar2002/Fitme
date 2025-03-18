const { Router } = require("express");
const supplementRouter = Router();

const { displaySupplement, addSupplement, deleteSupplement, updateSupplement } = require("../controller/supplementController");

//--------------------------------------------------------------------------------------------------------
supplementRouter.get("/", displaySupplement);
supplementRouter.post("/add", addSupplement);
supplementRouter.delete("/:supplementID", deleteSupplement)
supplementRouter.patch("/:supplementID", updateSupplement)

//--------------------------------------------------------------------------------------------------------
module.exports = supplementRouter;