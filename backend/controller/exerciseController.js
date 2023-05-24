const { ExerciseModel } = require("../models/ExerciseModel");
const UserModel = require("../models/UserModel")

// add exercise
const addExercise = async (req, res) => {
    const { name, category, videolink, level, imagelink } = req.body;
    try {
        const existexercise = await ExerciseModel.findOne({ $and: [{ name: name }, { category: category }] });
        if (existexercise) {
            return res.send("exercise already Exists");
        }
        else {
            const exercise = new ExerciseModel({
                name: name,
                category: category,
                level: level,
                videolink: videolink,
                imagelink: imagelink
            });
            exercise.save()
                .then(() => {
                    return res.send({ success: true });
                }).catch((err) => {
                    console.error(err);
                    return res.send({ success: false, message: "Service Error" });
                });
        }
    } catch (err) {
        console.error(err);
        return res.send({ success: false, message: "Service Error" });
    }
};

const displayExercise = async (req, res) => {
    try {
        const exercise = await ExerciseModel.find({});
        if (exercise) {
            return res.status(200).json(exercise);
        }
        else {
            return res.send({ success: false, message: "Service Error" });
        }
    } catch (error) {
        console.error(error);
        return res.send({ success: false, message: "Service Error" });
    }
}

const displayExercisebyID = async (req, res) => {
    try {
        const exercise = await ExerciseModel.findOne({ _id: req.params.exerciseID });
        if (exercise) {
            return res.status(200).json(exercise);
        }
        else {
            return res.send({ success: false, message: "Service Error" });
        }
    } catch (error) {
        console.error(error);
        return res.send({ success: false, message: "Service Error" });
    }
}

const deleteExercise = async (req, res) => {
    try {
        const existexercise = await ExerciseModel.findOne({ _id: req.params.exerciseID });
        if (existexercise) {
            await ExerciseModel.deleteOne({ _id: existexercise._id });
            return res.status(200).json({ success: true });
        }
        else {
            return res.send({ success: false, message: "Service Error" });
        }
    } catch (error) {
        console.error(error);
        return res.send({ success: false, message: "Service Error" });
    }
};

const updateExercise = async (req, res) => {
    try {
        await ExerciseModel.findOneAndUpdate(req.params.supplementID, req.body);
        return res.status(200).send({ success: true });
    } catch (error) {
        console.error(error);
        return res.send({ success: false, message: "Service Error" });
    }
};

const updateExercisetoUser = async (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    try {
        const user = await UserModel.findOne({ username: username });
        // console.log(user); 
        user.exercise.push(req.body.exerciseID)
        await user.save();
        res.json({ success: true })
    } catch (error) {
        console.log(error)
        res.json({ success: false })
    }
}

const deleteExercisetoUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: username });
        user.exercise = user.exercise.filter(exercise => !exercise.equals(req.body.exerciseID))
        await user.save();
        res.json({ success: true })
    } catch (error) {
        console.log(error)
        req.json({ success: false })
    }
}


module.exports = {
    displayExercise, displayExercisebyID, addExercise, deleteExercise, updateExercise, updateExercisetoUser, deleteExercisetoUser
};