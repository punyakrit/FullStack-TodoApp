import React, { useState, useEffect, useCallback } from "react";
import Todo from "./Todo";
import axios from "axios";

function AllTodo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchData = useCallback(() => {
    axios
      .get("http://localhost:3000/")
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
      await axios.put(`http://localhost:3000/${updatedTodos[index]._id}`, {
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
      await axios.delete(`http://localhost:3000/${deletedTodoId}`);
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
      await axios.post("http://localhost:3000/", {
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
    <div>
      <div>
        <input
          type="text"
          placeholder="Add Title"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          placeholder="Add Description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <h1>All Todos</h1>
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
