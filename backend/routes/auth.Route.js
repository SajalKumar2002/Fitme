const { Router } = require("express");
const authRouter = Router();

const {
    authUser,
    registerUser,
    logoutuser,
    checkauthentication,
    forgotpassword,
    checkotp,
    update,
    isAdmin,
    isUser,
    userid,
    user,
    changepass,
    session
} = require("../controller/authController");

//----------------------------------------------------
authRouter.route("/register").post(registerUser);
authRouter.route("/login")
    .get(checkauthentication)
    .post(authUser);
authRouter.route("/logout").post(logoutuser);
authRouter.route("/forgotpassword").post(forgotpassword)
authRouter.route("/update").patch(update);
authRouter.route("/isadmin").get(isAdmin);
authRouter.route("/isuser").get(isUser);
authRouter.route("/logout").get(logoutuser);
authRouter.route("/checkotp").post(checkotp);
authRouter.route("/user").get(user);
authRouter.route("/userid/:id").get(userid);
authRouter.route("/changepass").post(changepass);

authRouter.get('/session', session)

//----------------------------------------------------
module.exports = authRouter;