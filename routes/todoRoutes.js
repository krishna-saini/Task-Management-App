const express = require("express");
const router = express.Router();
const { getAllAndFilteredTodos, addTodo,searchTodo, updateTodo,deleteTodo, getTasks, addTask, updateTask, deleteTask} = require("../controllers/todoContoller");


router.route("/").get(getAllAndFilteredTodos).post(addTodo).patch(updateTodo).delete(deleteTodo);

// router.param("todoId", (req, res, next, val) => {
//   console.log(val);
//   next();
// });
router.route("/:todoId").get(getTasks).post(addTask).patch(updateTask).delete(deleteTask)

module.exports = { router};
