const { Router } = require('express')
const {
    addExercisetoUser,
    removeExercisetoUser,
    addSupplementtoUser,
    removeSupplementtoUser,
    favourite } = require("../controller/FavouriteController")
const favouriteRouter = Router()

favouriteRouter.get("/:userid", favourite)
favouriteRouter.post("/exercise", addExercisetoUser)
favouriteRouter.delete("/exercise", removeExercisetoUser)
favouriteRouter.post("/supplement", addSupplementtoUser)
favouriteRouter.delete("/supplement", removeSupplementtoUser)

module.exports = favouriteRouter;