import React from 'react'

function Todo({title, description}) {
  return (
    <div>
        <input type='checkbox'></input>
      <h2>{title}</h2>
      <h4>{description}</h4>
      <button>Delete Task</button>
    </div>
  )
}

export default Todo
