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
app.set('trust proxy', 1);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());

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
      console.log("u got here");
      let user = await doesUserExist(username);
      if (user === null) {
        return done(null, false);
      }
      done(null, user);
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log(user + "2");
  cb(null, { pernr: user.pernr});
});

passport.deserializeUser(async (user, done) => {
  console.log(user + "1");
  return done(null, await doesUserExist(user.pernr));
});

app.use(passport.initialize());
app.use(passport.session());

const isManager = (req) => {
  return req.user && req.user.isManager == 1;
};

const doesUserExist = async (pernr) => {
  console.log("does user exist?");
  try {
    const user = await User.findOne({ pernr: pernr });
    console.log(user);
    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
};

//POST REQUESTS
app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    console.log(req.user + "sadsa");
    res.send(JSON.stringify({ message: "success" }));
  }
);

app.get("/isLoggedIn", (req, res) => {
  console.log(req.user + "sadsa");
  console.log(JSON.stringify(req.session) + ":session");

  if (req.isAuthenticated()) {
    res.send(JSON.stringify({ message: "authenticated" }));
  } else {
    res.send(JSON.stringify({ message: "not authenticated" }));
  }
});

app.get("/logout", (req, res) => {
  res.send("lol!");
});

// app.post("/addtank", (req, res) => {
//   if(isManager){
//     //can make a request
//     return;
//   }
//   res.status(401).send(JSON.stringify({"status": "unautherized"}))
// });

//GET REQUESTS
app.get("/login", (req, res) => {
  res.send(
    "<form action='' method='post'><input name='username' /><input name='password' /><button type='submit'>login</button></form>login"
  );
});

app.get("/", () => {
  res.redirect("/main");
});

app.get("/main", (req, res) => {
  //if logged in =>
  if (!req.user) {
    res.redirect("/login");
  } else {
    //if(admin) => main admin alll tank data, else main not admin, only specific gdud data
    res.send("mama pizza" /*render */);
  }
});

//Sends JSON
app.get("/tanks", async (req, res) => {
  //if(isManager(req)){
  res.send(await getAllTanks());
  //}else if(req.user){
  // res.send(await getTanksByGdud("180"))
  //}else{
  //not connected
  //  res.status(500)
  // }
});

const getAllTanks = async () => {
  return await CarData.find();
};

const getTanksByGdud = async (gdud) => {
  return await CarData.find({ gdud: gdud });
};

const addTank = async (obj) => {
  console.log(JSON.stringify(obj) + "plapal");
  try {
    return { message: "success", data: await CarData.create(obj) };
  } catch {
    return { message: "failed" };
  }
};

app.post("/addTank", async (req, res) => {
  console.log(req.body);
  // if (isManager(req)) {
  res.send(await addTank(req.body));
  // } else {
  // res.send("dashboard");
  // }
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
