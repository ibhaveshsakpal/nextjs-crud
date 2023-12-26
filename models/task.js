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
  status: {
    type: String,
    required: [true, "Status is required"],
  },
});

const Task = models.Task || model("Task", TaskSchema);

export default Task;
