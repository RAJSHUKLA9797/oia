const express = require("express");
const bodyParser = require("body-parser");

const { createSubTask, getAllSubTask } = require("../controllers/subTask");

const subtaskRoute = express();

subtaskRoute.use(express.json());
subtaskRoute.use(bodyParser.urlencoded({ extended: true }));
//routes
subtaskRoute.post("/createSubTask", createSubTask);
subtaskRoute.post("/getAllSubtask", getAllSubTask);

module.exports = subtaskRoute;
