const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const connection = require("./dev/dev");
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const app = express();

connection.connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
  });
app.use("/images", express.static(path.join("assets/images")));
app.use('/admin/auth', authRoute);
app.use('/admin/users', userRoute);
app.use('/admin/post', postRoute);

module.exports = app;
