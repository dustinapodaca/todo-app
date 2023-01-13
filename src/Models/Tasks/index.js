import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  assignee: { type: String },
  complete: { type: Boolean, default: false },
  difficulty: { type: Number, default: 1 },
});

const Tasks = mongoose.model("tasks", taskSchema);

export default Tasks;
