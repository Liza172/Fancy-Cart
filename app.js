const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path');
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const flash = require("connect-flash");
const expressSession = require("express-session");
const indexRouter = require("./routes/index");

require("dotenv").config();
const db = require("./config/mongoose-connection")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(
  expressSession({
    resave : false,
    saveUninitialized : false,
    secret : process.env.EXPRESS_SESSION_SECRET,
  })
)

app.use(flash());
app.use(express.static(path.join(__dirname, "punlic")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter)


app.listen(3000);
