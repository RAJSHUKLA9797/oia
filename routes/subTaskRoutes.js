const express = require("express");
const bodyParser = require("body-parser");

const {
  createSubTask,
  getAllSubTask,
  updateSubtask,
  deleteSubtask,
} = require("../controllers/subTask");

const subtaskRoute = express();

subtaskRoute.use(express.json());
subtaskRoute.use(bodyParser.urlencoded({ extended: true }));
//routes
subtaskRoute.post("/createSubTask", createSubTask);
subtaskRoute.post("/getAllSubtask", getAllSubTask);
subtaskRoute.post("/updateSubtask", updateSubtask);
subtaskRoute.post("/deleteSubtask", deleteSubtask);

module.exports = subtaskRoute;
