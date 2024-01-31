const mongoose = require("mongoose");
const Task = require("../schemas/task");
const subtaskSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
  status: { type: Number, enum: [0, 1], default: 0 },
  created_at: { type: Date },
  updated_at: { type: Date },
  deleted_at: { type: Date },
});

const Subtask = mongoose.model("Subtask", subtaskSchema);

module.exports = Subtask;
