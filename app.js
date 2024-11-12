require("dotenv").config();
const { PORT, SESSION_KEY } = process.env;
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const pg = require("pg-simple-connection")(session);
const path = require("node:path");
const flash = require("connect-flash");
const passport = require("./config/passport");
const pool = require("./database/pool");
const registerUser = require("./authentication/register");

const app = express();

app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use((error, req, res, __) => {
  console.error(error.message);
  req.flash("error", `An error occured ${error.message}`);
  res.status(500);
  // might redirect to a dedicated error page
});

app.use(
  session({
    store: new pg({ pool: pool, createTableIfMissing: true }),
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Routes
// add flash errors to render after i create utility function
app.get("/home", render("home-page"));

app.get("/register", render("register"));

app.post("/register", registerUser, (req, res) => {
  req.flash("success", `Successfully created account ${res.user.username}`);
  res.redirect("/login");
});

app.get("/login", render("login"));
