const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const connection = require("./dev/dev");
const cors = require('cors')
const userRoute = require('./routes/user-route');
const app = express();

connection.connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cors());
app.use("/images", express.static(path.join("assets/images")));
app.use('/admin/users', userRoute);

module.exports = app;
