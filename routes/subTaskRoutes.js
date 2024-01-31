const express = require("express");
const bodyParser = require("body-parser");

const { createSubTask } = require("../controllers/subTask");

const subtaskRoute = express();

subtaskRoute.use(express.json());
subtaskRoute.use(bodyParser.urlencoded({ extended: true }));
//routes
subtaskRoute.post("/createSubTask", createSubTask);

module.exports = subtaskRoute;
