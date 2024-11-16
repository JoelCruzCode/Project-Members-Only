require("dotenv").config();
const { PORT } = process.env;
const express = require("express");
const path = require("node:path");
const flash = require("connect-flash");
const sessionConfig = require("./config/session");
const passport = require("./config/passport");
const registerUser = require("./controllers/userController");
const errorMiddleWare = require("./middleware/errorMiddleware");
const renderFlashMiddleWare = require("./middleware/renderMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const {
  registerValidation,
  loginValidation,
  messageValidation,
  handleValidationErrors,
} = require("./middleware/validationMiddleware");

const app = express();

app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(sessionConfig);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(errorMiddleWare);
// Routes

app.get("/home", renderFlashMiddleWare("home"));

app.get("/register", renderFlashMiddleWare("register"));

app.post(
  "/register",
  registerValidation,
  handleValidationErrors("register"),
  registerUser,
  (req, res) => {
    req.flash("success", `Successfully created account ${res.user.username}`);
    res.redirect("/login");
  },
);

app.get("/login", renderFlashMiddleWare("login"));

app.post(
  "/login",
  loginValidation,
  passport.authenticate("local-login", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "you have successfully logged in");
    res.redirect("/home");
  },
); //
app.listen(PORT, console.log(`Listening on port ${PORT}`));

//app.post(
//  "/register",
//  passport.authenticate("local-register", {
//    failureRedirect: "/register",
//    failureFlash: true,
//  }),
