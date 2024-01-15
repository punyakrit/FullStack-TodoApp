import React, { useState, useEffect, useCallback } from "react";
import Todo from "./Todo";
import axios from "axios";

function AllTodo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchData = useCallback(() => {
    axios
      .get("https://backend-todo-4ygr.onrender.com/")
      .then((response) => {
        setTodos(response.data.todos);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCheckboxChange = async (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);

    try {
      await axios.put(`https://backend-todo-4ygr.onrender.com/${updatedTodos[index]._id}`, {
        isDone: updatedTodos[index].done,
      });
    } catch (error) {
      console.error("Error updating todo in the database:", error);
    }
  };

  const handleDelete = async (index) => {
    const deletedTodoId = todos[index]._id;

    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);

    try {
      await axios.delete(`https://backend-todo-4ygr.onrender.com/${deletedTodoId}`);
    } catch (error) {
      console.error("Error deleting todo from the database:", error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddTask = async () => {
    try {
      await axios.post("https://backend-todo-4ygr.onrender.com/", {
        title: title,
        description: description,
        done: false,
      });

      fetchData(); // Fetch updated data after adding a new task
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <input
          className="border-2 border-gray-300 p-2 w-full"
          type="text"
          placeholder="Add Title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="mb-4">
        <input
          className="border-2 border-gray-300 p-2 w-full"
          type="text"
          placeholder="Add Description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleAddTask}
      >
        Add Task
      </button>

      <h1 className="text-2xl font-bold mt-8">All Todos</h1>
      <div>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            title={todo.title}
            description={todo.description}
            isDone={todo.done}
            onCheckboxChange={() => handleCheckboxChange(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default AllTodo;
