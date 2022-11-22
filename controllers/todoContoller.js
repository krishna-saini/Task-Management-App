const TodoModel = require("../models/todo");

// get all todos
exports.getTodos = async (req, res) => {
  try {
    const allTodos = await TodoModel.find();
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        allTodos,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// add a todo
exports.addTodo = async (req, res, next) => {
  try {
    // get all data from req.body
    const { title } = req.body;

    // check data validity
    if (!title)
      res.status(404).json({ status: "fail", message: "name field is empty" });

    // check if todo already exists in db
    const existingTodo = await TodoModel.findOne({ title });
    if (existingTodo) {
      return res
        .status(404)
        .json({ status: "fail", message: "Two todos cannot have same name" });
    }

    // if not exists, create one
    const newTodo = await TodoModel.create({
      title,
    });
    return res.status(201).json({ status: "success", data: { newTodo } });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
};

// update a todo
exports.updateTodo = async (req, res) => {
  try {
    // get data from req.body
    const { todoId, title } = req.body;
    // find it in db and update it directly
    const todo = await TodoModel.findByIdAndUpdate(todoId, title);
    res.status(200).json({
      status: "success",
      data: {
        todo,
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
};

// delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    await TodoModel.findByIdAndDelete(req.params.todoId);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// get all tasks
exports.getTasks = async (req, res) => {
  try {
    // get todoId from req object
    const todoId = req.params.todoId;
    // console.log(todoId);
    // check if todoid exists in db or not

    res.send("task are here");
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// add a task
exports.addTask = async (req, res, next) => {
  try {
    // get todoId from req object
    const todoId = req.params.todoId;
    console.log(todoId);
    // check if todoid exists in db or not
    const todo = await TodoModel.findById(todoId);
    // console.log(todo);
    if (!todo) {
      return res
        .status(404)
        .json({ status: "fail", message: "todoId not found" });
    }

    // get data from req.body
    const { task } = req.body;
    todo.tasks.push(task);
    await todo.save();
    res.status(201).json({ status: "success", data: { todo } });
  } catch (err) {
    console.log(err);
  }
};

// updata a task
exports.updateTask = async (req, res, next) => {
  try {
    const { todoId, taskKey } = req.body;
    const todo = await TodoModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // to return updated data
      runValidators: true, // to check validators if any
    });

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
