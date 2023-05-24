const mongoose = require('mongoose')

const FavouriteSchema = new mongoose.Schema({
    exercise: [{
        type: mongoose.Types.ObjectId,
        unique: true
    }],
    supplement: [{
        type: mongoose.Types.ObjectId,
        unique: true
    }],
    user: {
        type: mongoose.Types.ObjectId
    }
})

const FavouriteModel = mongoose.model("Favourite", FavouriteSchema);

module.exports = FavouriteModel;