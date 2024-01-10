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
  created_at: {
    type: Date,
    default: new Date()
  }
});

const Task = models.Task || model("Task", TaskSchema);

export default Task;
