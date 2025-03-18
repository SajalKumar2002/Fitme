// node libs
require("dotenv").config();
const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");

const connection = require("./config/db");

const PORT = process.env.PORT || 5000;

const routes = require("./routes/index");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//----------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

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