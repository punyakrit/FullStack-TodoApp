import React from 'react';

function Todo({ title, description, isDone, onCheckboxChange ,onDelete}) {
  return (
    <div className='flex space-x-5'>
      <input
        type='checkbox'
        checked={isDone}
        onChange={onCheckboxChange}
      />
      <h2>{title}</h2>
      <h4>{description}</h4>
      <button onClick={onDelete}>Delete Task</button>
    </div>
  );
}

export default Todo;
