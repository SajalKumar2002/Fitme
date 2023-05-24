const mongoose = require("mongoose");
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true
    },
    name: String,
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
        type: String
    },
    password: {
        type: String
    },
    createdAt: {
        type: Date,
        default: function () {
            return new Date()
        }
    },
    gender: String,
    age: Number,
    height: String,
    weight: String,
    targetWeight: String,
    weeklyGoal: String,
    activityLevel: String,
    token: { type: String },
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

UserSchema.plugin(passportLocalMongoose);

const UserModel = mongoose.model("User", UserSchema);

passport.use(UserModel.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (username, done) {
    const user = UserModel.findOne({ email: username })
    if (user) {
        done(null, user);
    }
})

module.exports = UserModel;