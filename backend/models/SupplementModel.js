const { model, Schema } = require("mongoose");

const SupplementSchema = new Schema({
    name: { type: String, trim: true },
    category: String,
    price: String,
    src: String,
    link: String,
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
});

const SupplementModel = model("Supplement", SupplementSchema);

module.exports = SupplementModel;