require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const CarData = require("./models/carData.cjs");
const User = require("./models/users.cjs");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.set("trust proxy", 1);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
// app.use(cookieParser());

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//middlware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// passport.authenticate

app.use(
  session({
    secret: "nivstankproject",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      // httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

mongoose.connect("mongodb://127.0.0.1:27017/db", {
  useNewUrlParser: true,
});

mongoose.set("useCreateIndex", true);

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
      let user = await doesUserExist(username);
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
  return done(null, await doesUserExist(user.pernr));
});

app.use(passport.initialize());
app.use(passport.session());

const doesUserExist = async (pernr) => {
  try {
    const user = await User.findOne({ pernr: pernr });
    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
};

//POST REQUESTS
app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/failedLogin" }),
  (req, res) => {
    res.send(
      JSON.stringify({
        message: "success",
        gdud: req.user.gdud,
        isManager: req.user.isManager,
        pernr: req.user.pernr,
      })
    );
  }
);

app.get("/failedLogin", (req, res) => {
  res.send(JSON.stringify({ message: "fail" }));
});

app.get("/isLoggedIn", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(
      JSON.stringify({
        message: "authenticated",
        gdud: req.user.gdud,
        isManager: req.user.isManager,
        pernr: req.user.pernr,
      })
    );
  } else {
    res.send(JSON.stringify({ message: "not authenticated" }));
  }
});

//GET REQUESTS

//Sends JSON
app.get("/tanks", async (req, res) => {
  if (isManager(req)) {
    res.send(await getAllTanks());
  } else if (req.user) {
    res.send(await getTanksByGdud(req.user.gdud));
  } else {
    // not connected
    res.status(500);
  }
});

const getAllTanks = async () => {
  return await CarData.find();
};

const getTanksByGdud = async (gdud) => {
  return await CarData.find({ gdud: gdud });
};

const addTank = async (obj) => {
  try {
    return { message: "success", data: await CarData.create(obj) };
  } catch {
    return { message: "failed" };
  }
};

const isManager = (req) => {
  return req.user && req.user.isManager == 1;
};

app.post("/addTank", async (req, res) => {
  if (isManager(req)) {
    res.send(await addTank(req.body));
  } else {
    res.send({ message: "fail, not manager/connected" });
  }
});

app.delete("/logout", function (req, res, next) {
  let message;
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    message = "Logged Out";
  });
  req.session.destroy(function (err) {
    if (!err) {
      res
        .status(200)
        .clearCookie("connect.sid", { path: "/" })
        .json({ status: "Success" });
      return;
    } else {
      res.send({ message });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
