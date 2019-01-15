const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  author: { type: String, required: "No author passed" },
  description: { type: String, required: "No desc passed" },
  priority: { type: String, required: "No priority passed" },
  completed: { type: Boolean, required: "No completed passed" }
});

const todoModel = mongoose.model("TodoModel", todoSchema);

module.exports = todoModel;
