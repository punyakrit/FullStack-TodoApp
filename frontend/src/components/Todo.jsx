import React from 'react'

function Todo({title, description}) {
  return (
    <div>
      <h2>{title}</h2>
      <h4>{description}</h4>
    </div>
  )
}

export default Todo
