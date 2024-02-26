// packages
require("dotenv").config({ path: ".env" });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const ip = require("ip");

// pages
const PAGES = require("./pages");

// routes
const homeRoute = require("./core/routes/home");
const errorRoute = require("./core/routes/404");
const baseRoute = require("./core/routes/base");
const baseWithIdRoute = require("./core/routes/baseWithId");

// init app
const app = express();

// set views engine
app.set("view engine", "ejs");
app.set("views", "views");

// parse incoming data request
app.use(bodyParser.urlencoded({ extended: false }));

// load static file
app.use(express.static(path.join(__dirname, "public")));

// middleware
app.use((req, res, next) => {
  app.locals.pageTitle = "Pages Template";
  app.locals.pages = PAGES;

  next();
});

// home
app.use(homeRoute);

// base without id
app.use(baseRoute);

// base with id
app.use(baseWithIdRoute);

// not found page
app.use(errorRoute);

// start the server
app.listen(process.env.PORT, () => {
  console.log(
    `Example app listening at http://localhost:${
      process.env.PORT
    } - http://${ip.address()}:${process.env.PORT}`,
  );
});
