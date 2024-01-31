const Task = require("../schemas/task");
const SubTask = require("../schemas/subtask");
const Subtask = require("../schemas/subtask");
//create task
exports.createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const newTask = new Task({
    title: title,
    description: description,
    dueDate: dueDate,
    priority: 0,
    status: "TODO",
  });
  newTask
    .save()
    .then(() => {
      res.status(200).send("Task Created");
    })
    .catch((error) => {
      console.error(error);
    });
};
//getTask by priority
exports.getTaskByPriority = async (req, res) => {
  try {
    const { priority } = req.body;
    const tasks = await Task.find({});
    const arr = tasks.filter((task) => task.priority == priority);
    console.log(arr);
    res.status(200).send(arr);
  } catch (err) {
    res.status(400).send(err);
  }
};
//get task by duedate
exports.getTaskByDueDate = async (req, res) => {
  try {
    const { DueDate } = req.body;
    const tasks = await Task.find({});
    const arr = tasks.filter((task) => task.dueDate == DueDate);
    console.log(arr);
    res.status(200).send(arr);
  } catch (err) {
    res.status(400).send(err);
  }
};
//update task duedate
exports.updateTaskByDueDate = async (req, res) => {
  try {
    const { taskId, DueDate } = req.body;
    const task = await Task.findById(taskId);
    console.log(task);
    // const arr = tasks.filter((task) => task.dueDate == DueDate);
    task.dueDate = DueDate;
    await task.save();
    console.log(task);
    res.status(200).send("updated");
  } catch (err) {
    res.status(400).send(err);
  }
};
//updadte task status
exports.updateTaskByStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;
    const task = await Task.findById(taskId);
    console.log(task);
    // const arr = tasks.filter((task) => task.dueDate == DueDate);
    task.status = status;
    await task.save();
    console.log(task);
    res.status(200).send("updated");
  } catch (err) {
    res.status(400).send(err);
  }
};
//delete task
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    const subtasks = await Subtask.find({ taskId: taskId });
    for (let subtask of subtasks) {
      if (subtask.taskId == taskId) {
        await SubTask.findByIdAndDelete(subtask._id);
      }
    }
    await Task.findByIdAndDelete(taskId);
    res.send("deleted");
  } catch (err) {}
};
