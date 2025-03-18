const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        trim: true,
        default: () => this.email.subString(0, this.email.indexOf("@"))
    },
    avatar: [
        {
            public_id: {
                type: String
            },
            url: {
                type: String
            }
        }
    ],
    role: {
        type: String,
        enum: ['user', 'admin', 'trainer'],
        default: 'user'
    },
    password: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    age: Number,
    height: { type: Number },
    weight: { type: Number },
    targetWeight: { type: Number },
    activityLevel: {
        type: String,
        enum: ['low', 'medium', 'high'],
    },
    otp: {
        type: Number
    },
    otpExpiry: {
        type: Date,
        default: Date.now
    }
},
    { timestamps: true }
)


const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;