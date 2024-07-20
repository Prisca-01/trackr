import { useState } from 'react';
import PropTypes from 'prop-types';

const TodoForm = ({ addTodo, selectedDate }) => {
  const [value, setValue] = useState('');


  const handleSubmit = e => {
    e.preventDefault();
    if (!value.trim) return;
    addTodo(value, selectedDate);
    setValue(''); // Sets input to empty
  };

  return (
    <form className="flex items-center mb-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="flex-1 p-2 border border-gray-300 rounded-l"
        value={value}
        placeholder="What is the task today?"
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-700 transition-colors duration-300"
      >Add Task</button>
    </form>
  );
};

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
};

export default TodoForm;
