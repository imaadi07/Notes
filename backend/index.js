const express = require("express");
const passport = require("passport");
const session = require("express-session");
const database = require("./config/db");
const cors = require("cors");
require("./middleware/passport");
const dotenv = require("dotenv").config();
const router = require("./routes/mainRoute");

const app = express();
database();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`Server running at port 3000`);
});
