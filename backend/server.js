require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cors = require("cors");
const api = require("./helpers.js");

const app = express();
const origin_url = "http://localhost";
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

mongoose.connect(mongo_url,
  {
  
  }
);

mongoose.set("useCreateIndex", true);

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
      let user = await api.doesUserExist(username);
      if (user === null) {
        return done(null, false);
      }
      done(null, user);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, { pernr: user.pernr });
});

passport.deserializeUser(async (user, done) => {
  return done(null, await api.doesUserExist(user.pernr));
});

app.use(passport.initialize());
app.use(passport.session());

//----------------------------------
//POST REQUESTS
app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/failedLogin" }),
  api.handleLogin
);

app.get("/failedLogin", (req, res) => {
  res.send(JSON.stringify({ message: "fail" }));
});

app.get("/isLoggedIn", api.isLoggedIn);

//----------------------------------
//GET REQUESTS
app.get("/tanks", api.handleTanks);

app.post("/addTank", api.handleAddTank);

//----------------------------------
//DELETE REQUESTS
app.delete("/logout", api.handleLogout);

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
