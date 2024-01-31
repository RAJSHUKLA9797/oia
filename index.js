const express = require("express");
const mongoose = require("mongoose");

//routes import
const taskRoute = require("./routes/taskRoute");
const subtaskRoute = require("./routes/subTaskRoutes");

const app = express();
const bodyParser = require("body-parser");
module.exports = app;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connection
const DB_URL = "mongodb://127.0.0.1:27017/openInApp";
mongoose
  .connect(DB_URL, { useNewUrlParser: true })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb" + err));

///routes
app.use("/api", taskRoute);
app.use("/api", subtaskRoute);

app.get("/", (req, res) => {
  res.send("Looks fine, now check the other routes!");
});
app.listen(4000, () => {
  console.log("on port 4000!!!");
});
