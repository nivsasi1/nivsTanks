require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const passport = require('./src/config/passport-config.js');

const app = express();
const origin_url = "http://localhost";
//const origin_url = "http://localhost:5173"; --> not docker
//const mongo_url = "mongodb://localhost:27017/db"; --> not docker
const mongo_url = "mongodb://host.docker.internal:27017/db";


app.set("trust proxy", 1);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Not useful but..
/*
  app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next(); });
*/

app.use(cors({ origin: origin_url, credentials: true }));

app.use(
  session({
    secret: process.env.CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

mongoose.connect(mongo_url,{});

mongoose.set("useCreateIndex", true);


app.use(passport.initialize());
app.use(passport.session());


const userRoutes = require('./src/routes/auth.js');
const rekemRoutes = require('./src/routes/car.js');
// Use the userRoutes for all user-related routes
app.use('/', userRoutes);

// Use the rekemRoutes for all rekem (carData) related routes
app.use('/', rekemRoutes);


app.listen(3000, function () {
  console.log("Server started on port 3000.");
  console.log("tatata.");
});
