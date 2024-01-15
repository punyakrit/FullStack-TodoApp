import React from 'react';

function Todo({ title, description, isDone, onCheckboxChange, onDelete }) {
  return (
    <div className='flex items-center space-x-5 p-4 border-b border-gray-300'>
      <input
        type='checkbox'
        checked={isDone}
        onChange={onCheckboxChange}
        className='cursor-pointer'
      />
      <div>
        <h2 className={`text-xl ${isDone ? 'line-through text-gray-500' : 'text-black'}`}>
          {title}
        </h2>
        <h4 className='text-gray-600'>{description}</h4>
      </div>
      <button
        onClick={onDelete}
        className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300'
      >
        Delete Task
      </button>
    </div>
  );
}

export default Todo;
