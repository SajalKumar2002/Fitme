// node libs
require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const connection = require("./config/db");
const session = require("express-session")
const passport = require("passport")
const cors = require('cors');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(session({
  name: 'mycookie',
  secret: 'thisismyproject',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

//----------------------------------------------------
// Routes
const authRouter = require("./routes/auth");
const supplementRouter = require("./routes/supplement");
const articleRouter = require("./routes/article");
const exerciseRouter = require("./routes/exercise");
const contactRouter = require("./routes/contact");
const favouriteRouter = require('./routes/favourite');

//----------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//----------------------------------------------------
// Api
app.use("/auth", authRouter);
app.use("/supplement", supplementRouter);
app.use("/article", articleRouter);
app.use("/exercise", exerciseRouter);
app.use("/contact", contactRouter);
app.use("/favourite", favouriteRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  try {
    connection;
    console.log("connected successfully to DB");
  } catch (error) {
    console.error(error);
  }
  console.log("Server is running on " + PORT);
});