const express = require("express");
const bodyParser = require("body-parser");

const { createTask } = require("../controllers/task");

const taskRoute = express();

taskRoute.use(express.json());
taskRoute.use(bodyParser.urlencoded({ extended: true }));
//routes
taskRoute.post("/createTask", createTask);

module.exports = taskRoute;
