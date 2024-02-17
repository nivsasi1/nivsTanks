const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { doesUserExist } = require("../controllers/auth.js")

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
  
  module.exports = passport;