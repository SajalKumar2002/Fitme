const bcrypt = require('bcrypt');

const UserModel = require('../models/UserModel');

// add admin
const addAdmin = async (req, res) => {
    try {
        const existadmin = await UserModel.findOne({ email: req.body.email });
        if (existadmin) {
            return res.status(400).send({ message: "Admin already exists" });
        }

        const hash = await bcrypt.hash(req.body.password, 10)


        const newadmin = await UserModel.create({
            ...req.body,
            password: hash,
            role: "admin"
        });

        return res.status(200).send(newadmin);
    } catch (error) {
        console.log(error);
        res.status(500).send("Service Error");
    }
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
        return res.status(500).send("Service Error");
    }
};

const updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await UserModel.findByIdAndUpdate(req.params.adminID, req.body, { new: true });
        return res.status(200).send(updatedAdmin);
    } catch (error) {
        console.error(error);
        return res.send("Service Error")
    }
};

const deleteAdmin = async (req, res) => {
    try {
        await UserModel.findOneAndDelete({ _id: req.params.id, role: "admin" });
        return res.json({ success: true })
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Service Error" })
    }
};

const addTrainer = async (req, res) => {
    try {
        const existadmin = await UserModel.findOne({ email: req.body.email });
        if (existadmin) {
            return res.status(400).send({ message: "Admin already exists" });
        }

        const hash = await bcrypt.hash(req.body.password, 10)


        const newadmin = await UserModel.create({
            ...req.body,
            password: hash,
            role: "trainer"
        });

        return res.status(200).send(newadmin);
    } catch (error) {
        console.log(error);
        res.status(500).send("Service Error");
    }
};

const displayTrainer = async (req, res) => {
    try {
        const trainer = await UserModel.find({ role: "trainer" });
        if (trainer) {
            return res.status(200).send(trainer);
        }
        else {
            return res.status(400).send({ message: "Service Error" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Service Error");
    }
};

const updateTrainer = async (req, res) => {
    try {
        const updatedTrainer = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send(updatedTrainer);
    } catch (error) {
        console.error(error);
        return res.send("Service Error")
    }
};

const deleteTrainer = async (req, res) => {
    try {
        await UserModel.findOneAndDelete({ _id: req.params.id, role: "trainer" });
        return res.json({ success: true })
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Service Error" })
    }
};

module.exports = {
    addAdmin,
    displayAdmin,
    updateAdmin,
    deleteAdmin,
    addTrainer,
    displayTrainer,
    updateTrainer,
    deleteTrainer
};