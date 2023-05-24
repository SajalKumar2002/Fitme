const { model, Schema } = require("mongoose");
const { ExerciseSchema } = require("./ExerciseModel")

const GoalSchema = new Schema({
    name: String,
    image: String,
    maingoal: String,
    level: String,
    views: Number,
    likes: Number,
    goal: String,
    programduration: Number,
    daysperweek: Number,
    exercise: { type: ExerciseSchema }
},
    { timestamps: true }
)
const GoalModel = model("Goal", GoalSchema);

module.exports = GoalModel;