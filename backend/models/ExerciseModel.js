const { model, Schema } = require("mongoose");

const ExerciseSchema = new Schema({
    name: { type: String, trim: true },
    category: { type: String, enum: ['chest', 'shoulders', 'triceps', 'biceps', 'legs', 'back', 'lats', 'quads', 'forearms', ''] },
    level: { type: String, enum: ['beginner', 'intermediate', 'advance'] },
    imagelink: String,
    videolink: String,
    images: [
        {
            public_id: {
                type: String
            },
            url: {
                type: String
            }
        }
    ],
    videos: [
        {
            public_id: {
                type: String
            },
            url: {
                type: String
            }
        }
    ],
},
    { timestamps: true }
);

const ExerciseModel = model("Exercise", ExerciseSchema);

module.exports = { ExerciseModel, ExerciseSchema };