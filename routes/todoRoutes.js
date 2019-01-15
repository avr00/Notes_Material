const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.get("/", todoController.loadTodos);

router.get("/todos", todoController.loadTodos);

router.get("/user/:id", todoController.loadTodo);

router.post("/create", todoController.createTodo);

router.delete("/delete/:id", todoController.deleteUser);

router.put("/update/:id", todoController.updateTodo);

module.exports = router;
