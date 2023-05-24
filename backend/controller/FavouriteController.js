const FavouriteModel = require('../models/FavouriteModel')
const mongoose = require('mongoose')

// -----------------------------------------
const addExercisetoUser = async (req, res) => {
    const { exerciseid, userid } = req.body;
    try {
        const user = await FavouriteModel.findOne({ user: userid })
        if (user) {
            console.log('if');
            (user.exercise).push(exerciseid)
            await user.save();
            res.send({ success: true })
        } else {
            console.log('else');
            const Favourite = new FavouriteModel({
                user: userid
            })
            Favourite.exercise.push(exerciseid)
            Favourite.save();
            res.send({ success: true })
        }
    } catch (error) {
        console.log(error);
        res.send({ success: false })
    }
}

const removeExercisetoUser = async (req, res) => {
    const {
        userid,
        exerciseid
    } = req.body;
    console.log(req.body)
    try {
        const user = await FavouriteModel.findOne({ user: userid })
        user.exercise = (user.exercise).filter(exercise => !exercise.equals(exerciseid))
        await user.save();
        res.json({ success: true })
    } catch (error) {
        console.log(error)
        res.send({ success: false })
    }
}

// ---------------------------------------------------
const addSupplementtoUser = async (req, res) => {
    console.log(req.body);
    const {
        userid,
        supplementid
    } = req.body;
    try {
        const user = await FavouriteModel.findOne({ user: userid })
        if (user) {
            user.supplement.push(supplementid);
            await user.save();
        } else {
            const Favourite = new FavouriteModel({
                user: userid
            })
            Favourite.save();
            Favourite.supplement.push(supplementid)
        }
    } catch (error) {
        console.log(error);
        res.send({ success: false })
    }
}

const removeSupplementtoUser = async (req, res) => {
    const {
        userid,
        supplementid
    } = req.body;
    try {
        const user = await FavouriteModel.findOne({ user: userid })
        user.supplement = user.supplement.filter(supplement => !supplement.equals(supplementid))
        await user.save();
        res.json({ success: true })
    } catch (error) {
        console.log(error)
        res.send({ success: false })
    }
}

// ---------------------------------------------------
const favourite = async (req, res) => {
    try {
        const userid = req.params.userid;
        // console.log(userid)
        const user = await FavouriteModel.findOne({ user: userid })
        res.send({ favourite: user })
    } catch (error) {
        console.log(error)
        res.send({ success: false })
    }
}

module.exports = {
    addExercisetoUser,
    removeExercisetoUser,
    addSupplementtoUser,
    removeSupplementtoUser,
    favourite
};