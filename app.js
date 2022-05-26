require("dotenv").config();
const express = require("express");
//const expressLayouts = require('express-ejs-layouts');
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const session = require("express-session");
const server = require("http").createServer(app);
const flash = require("connect-flash");
var MySQLStore = require("express-mysql-session")(session);
const env = process.env.NODE_ENV || "development";
const config = require("./config/config.json")[env];


//MYSQLSTORE
var sessionStore = new MySQLStore(config);

//Models
const models = require("./models");

//Sequelize models
models.sequelize
  .sync()
  .then(() => {
    console.log("Models Synced!");
  })
  .catch((error) => {
    console.log("error regarding models syncing");
    console.log(error);
  });

// EJS
app.set("view engine", "ejs");

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//flash-pasport errors
app.use(flash());

//flash needs session
app.use(
  session({
    secret: "secret",
    resave: true,
    store: sessionStore,
    saveUninitialized: true,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());
// Passport Config
require("./config/passport")(passport);

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
//based on models.
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));

//BACKEND
//API required when accessing backend
app.use("/api/poi", require("./routes/poi.js"));
app.use("/api/reviews", require("./routes/reviews.js"));

//local
const WEB_PORT = process.env.WEB_PORT;
app.listen(5000);
