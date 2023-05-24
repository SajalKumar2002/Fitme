const { model, Schema } = require("mongoose");

const ArticleSchema = new Schema({
    Title: {
        type: String
    },
    content: {
        type: String
    },
    readBy: Number,
    LikedBy: Number,
    images: [
        {
            public_id: {
                type: String
            },
            url: {
                type: String
            }
        }
    ]
},
    { timestamps: true }
)

const ArticleModel = model("Article", ArticleSchema);

module.exports = ArticleModel;