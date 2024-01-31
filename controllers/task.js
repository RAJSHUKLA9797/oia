const Task = require("../schemas/task");
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
