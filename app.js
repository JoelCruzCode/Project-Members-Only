require("dotenv").config();
const { PORT } = process.env;
const express = require("express");
const path = require("node:path");
const flash = require("connect-flash");
const sessionConfig = require("./config/session");
const passport = require("./config/passport");
const registerUser = require("./controllers/userController");
const errorMiddleWare = require("./middleware/errorMiddleware");
const authMIddleware = require("./middleware/authMiddleware");

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

// add flash errors to render after i create utility function
app.get("/home", render("home-page"));

app.get("/register", render("register"));

app.post("/register", registerUser, (req, res) => {
  req.flash("success", `Successfully created account ${res.user.username}`);
  res.redirect("/login");
});

app.get("/login", render("login"));

app.listen(PORT, console.log(`Listening on port ${PORT}`));
// git: moved session into its own config file, moved error middleware into its own middleware file, removed unnecessary calls in passport config
