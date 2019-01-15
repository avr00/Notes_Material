const TodoModel = require("../models/todoModel");

exports.loadTodos = async (req, res) => {
  TodoModel.find((err, data) => {
    if (err) return console.error(err);
    res.send(data);
  });
};

exports.loadTodo = async (req, res) => {
  TodoModel.findById(req.params.id, (err, data) => {
    if (err) return console.error(err);
    res.send(data);
  });
};

exports.createTodo = async (req, res) => {
  const newTodo = new TodoModel({
    author: req.body.author,
    description: req.body.description,
    priority: req.body.priority,
    completed: false
  });

  try {
    await newTodo.save();
    res.send("succesfully saved to DB!");
  } catch (err) {
    res.status(500).send(err, "error at saving");
  }
};

exports.deleteUser = (req, res) => {
  TodoModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) return console.error(err);
    res.send("User succesfully deleted!");
  });
};

exports.updateTodo = (req, res) => {
  //find the user
  TodoModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, data) => {
      if (err) return console.error(err);
      res.send(`updated user: ${data}`);
    }
  );
  //pass new body

  //save user with new body
};
