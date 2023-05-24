const passport = require("passport");
const UserModel = require('../models/UserModel');

//----------------------------------------------------
// add admin
const addAdmin = async (req, res) => {
    UserModel.register({ username: req.body.username, role: "admin" }, req.body.password, function (err, user) {
        if (err) {
            console.error(err);
            res.json({ success: false })
        } else {
            passport.authenticate("local")(req, res, function () {
                res.json({ success: true, role: 'admin' })
            })
        }
    });
};

const displayAdmin = async (req, res) => {
    try {
        const admin = await UserModel.find({});
        if (admin) {
            return res.status(200).send(admin);
        }
        else {
            return res.status(400).send({ message: "Service Error" });
        }
    } catch (error) {
        console.error(error);
        return res.send("Service Error");

    }
};

const updateAdmin = async (req, res) => {
    try {
        await UserModel.updateOne(existadmin._id, req.body);
        return res.status(200).send({ message: "Updation done" });
    } catch (error) {
        console.error(error);
        return res.send("Service Error")
    }
};

const isAdmin = (req, res) => {
    if (req.isAuthenticated() && req.session.role === "admin") {
        res.json({ success: true })
    } else {
        res.json({ success: false, message: "Page Not Found" })
    }
}
//----------------------------------------------------

module.exports = { displayAdmin, addAdmin, updateAdmin, isAdmin };