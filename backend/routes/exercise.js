const { Router } = require("express");
const { displayExercise, addExercise, deleteExercise, updateExercise, updateExercisetoUser, deleteExercisetoUser } = require("../controller/exerciseController");
const exerciseRouter = Router();

//--------------------------------------------------------------------------------------------------------
exerciseRouter.get("/", displayExercise);
exerciseRouter.post("/add", addExercise);
exerciseRouter.delete("/:exerciseID", deleteExercise)
exerciseRouter.patch("/:exerciseID", updateExercise)
exerciseRouter.post('/exercisetouser', updateExercisetoUser)
exerciseRouter.delete('/exercisetouser', deleteExercisetoUser)

//--------------------------------------------------------------------------------------------------------
module.exports = exerciseRouter;