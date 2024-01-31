// const Task = require("../schemas/task");
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
