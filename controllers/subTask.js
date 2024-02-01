const Task = require("../schemas/task");
const Subtask = require("../schemas/subtask");
//create task
exports.createSubTask = async (req, res) => {
  const { taskId } = req.body;
  const newSubTask = new Subtask({
    taskId: taskId,
  });
  newSubTask
    .save()
    .then(() => {
      res.status(200).send("SubTask Created");
    })
    .catch((error) => {
      console.error(error);
    });
};
//get subtask
exports.getAllSubTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    const allSubtask = await Subtask.find({ taskId });
    res.status(200).send(allSubtask);
  } catch (error) {
    console.error(error);
  }
};

//update subtask
exports.updateSubtask = async (req, res) => {
  try {
    const { subtaskId, status } = req.body;
    const subTask = await Subtask.findById(subtaskId);
    subTask.status = status;
    await subTask.save();
    const taskId = subTask.taskId;
    const allSubtasks = await Subtask.find();
    var fl = 1;
    for (let subtask in allSubtasks) {
      if (subtask.taskId == taskId) {
        if (subTask.status == 0) {
          fl = 0;
          break;
        }
      }
    }
    if (fl == 1) {
      const Task = await Task.findById(taskId);
      Task.status = "DONE";
    }
  } catch (err) {
    console.log(err);
  }
};

//delete task
exports.deleteSubtask = async (req, res) => {
  try {
    const { subtaskId } = req.body;
    const subTask = await Subtask.findById(subtaskId);
    // await subTask.delete();

    const taskId = subTask.taskId;
    await Subtask.findByIdAndDelete(subtaskId);
    const allSubtasks = await Subtask.find();
    var fl = 1;
    for (let subtask in allSubtasks) {
      if (subtask.taskId == taskId) {
        if (subTask.status == 0) {
          fl = 0;
          break;
        }
      }
    }
    if (fl == 1) {
      const Task = await Task.findById(taskId);
      Task.status = "DONE";
    }
  } catch (err) {
    console.log(err);
  }
};
