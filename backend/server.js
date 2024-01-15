const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const cors = require('cors')

mongoose.connect(process.env.MONGODB_URL);

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  done: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

app.use(express.json());
app.use(cors())

app.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      todos,
    });
  } catch {
    res.status(500).json({
      error: "Server error",
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = await Todo.create({
      title: title,
      description: description,
      done: false,
    });
    res.status(201).json({
      msg: "Todo Created",
    });
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { isDone } = req.body;
    const updateTodo = await Todo.findByIdAndUpdate(id, { done: isDone });

    if (!updateTodo) {
      return res.status(404).json({
        msg: "Todo Doesn't exist",
      });
    }

    res.json({
      msg: "Todo Updated",
    });
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTodo = await Todo.findByIdAndDelete(id);

    if (!deleteTodo) {
      return res.status(404).json({
        msg: "Todo Doesn't exist",
      });
    }

    res.json({
      msg: "Todo Deleted",
      deleteTodo,
    });
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use((err, req, res, next) => {
  console.error(err); // Log or handle the error
  res.status(400).json({
    msg: "Invalid Inputs error",
  });
});

app.listen(3000, () => {
  console.log("Server is started");
});
