const { Router } = require("express");
const articleRouter = Router();
const { displayArticle, addArticle, updateArticle, deleteArticle } = require("../controller/articleController");

//----------------------------------------------------
articleRouter.get("/", displayArticle);
articleRouter.post("/add", addArticle);
articleRouter.patch("/:articleID", updateArticle);
articleRouter.delete("/:articleID", deleteArticle);

//----------------------------------------------------
module.exports = articleRouter;