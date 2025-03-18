const { Router } = require("express");

const routes = Router();

const adminRouter = require("./admin.Route");
// const articleRouter = require("./article.Route");
// const authRouter = require("./auth.Route");
// const contactRouter = require("./contact.Route");
// const exerciseRouter = require("./exercise.Route");
// const favouriteRouter = require("./favourite.Route");
// const supplementRouter = require("./supplement.Route");

routes.use("/admin", adminRouter);
// routes.use("/article", articleRouter);
// routes.use("/auth", authRouter);
// routes.use("/contact", contactRouter);
// routes.use("/exercise", exerciseRouter);
// routes.use("/favourite", favouriteRouter);
// routes.use("/supplement", supplementRouter);

module.exports = routes;