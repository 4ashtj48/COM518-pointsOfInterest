var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

const users = require("../models").users;

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(async function (username, password, done) {
      try {
        let User = await users.findOne({ where: { username: username } });

        if (User) {
          if (User.password != password) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, User);
        } else {
          return done(null, false, { message: "Incorrect username." });
        }
      } catch (e) {
        console.log(e);
        return done(null, false, { message: e });
      }
    })
  );
};

passport.serializeUser(function (user, done) {
  try {
    return done(null, user.id);
  } catch (e) {
    console.log(e);
  }
});

passport.deserializeUser(async function (id, done) {
  try {
    let user = await users.findByPk(id);

    return done(null, user);
  } catch (e) {
    console.log(e);

    return done(e, null);
  }
});

//username: "tim",
// password: "tim123"

//username: "kate",
//password: "kate123"
