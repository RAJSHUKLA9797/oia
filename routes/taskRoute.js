const express = require("express");
const bodyParser = require("body-parser");
const { checkToken } = require("../middleware");

const {
  createTask,
  getTaskByPriority,
  getTaskByDueDate,
  updateTaskByDueDate,
  updateTaskByStatus,
  deleteTask,
} = require("../controllers/task");

const taskRoute = express();

taskRoute.use(express.json());
taskRoute.use(bodyParser.urlencoded({ extended: true }));
//routes
taskRoute.post("/createTask", checkToken, createTask);
taskRoute.post("/getTaskByPriority", getTaskByPriority);
taskRoute.post("/getTaskByDueDate", getTaskByDueDate);
taskRoute.post("/updateTaskByDueDate", updateTaskByDueDate);
taskRoute.post("/updateTaskByStatus", updateTaskByStatus);
taskRoute.post("/deleteTask", deleteTask);

module.exports = taskRoute;
