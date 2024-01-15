import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import axios from "axios";

function AllTodo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/")
      .then((response) => {
        setTodos(response.data.todos);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []); 

  return (
    <div>
      {todos.map((todo, index) => (
        <Todo key={index} title={todo.title} description={todo.description} />
      ))}
      
    </div>
  );
}

export default AllTodo;
