require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const pg = require("pg-simple-connection")(session);
const path = require("node:path");
const flash = require("connect-flash");
const passport = require("./config/passport");
const { pool } = require("./database/pool");
const { PORT, SESSION_KEY } = process.env;

const app = express();

app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new pg({ pool: pool }),
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

app.get("/login", render("login"));
