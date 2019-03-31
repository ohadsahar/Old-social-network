const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");
const Connection = require("./dev/dev");
//returing us an express app
const app = express();

Connection.ConnectMongoose();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join("assets/images")));

module.exports = app;
