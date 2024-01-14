const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URL);

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Todo = new mongoose.model("Todo", todoSchema);

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const todo = await Todo.find();
    res.status(200).json({
      todo,
    });
  } catch {
    res.json({
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
    });
    res.status(201).json({
      msg: "Todo Created",
    });
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put('/:id',async (req,res)=>{
  try{
    const id= req.params.id
    const { title, description } = req.body;
    const updateTodo = await Todo.findByIdAndUpdate(id,{title,description})
    if(!updateTodo){
      res.json({
        msg: "Todo Doesnt exists",
      });
    }
    res.json({
      msg: "Todo Updated"
    })
    
  }catch{
    res.status(500).json({ error: "Internal Server Error" });
  
  }
})

app.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTodo = await Todo.findByIdAndDelete(id);
    if (!deleteTodo) {
      res.json({
        msg: "Todo Doesnt exists",
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
  res.json({
    msg: "Invalid Inputs error",
  });
});

app.listen(3000, () => {
  console.log("Server is started");
});
