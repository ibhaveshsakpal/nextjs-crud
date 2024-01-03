import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  created_by: {
    type: String,
    required: [true, "Creator name is required"],
  },
  task: {
    type: String,
    required: [true, "Name is required"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Task = models.Task || model("Task", TaskSchema);

export default Task;
