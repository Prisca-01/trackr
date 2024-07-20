import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className="flex justify-between items-center p-2 border-b border-blue-300">
      {/* Task display */}
      <p
        onClick={() => toggleComplete(task.id)}
        className={`${
          task.completed ? "line-through text-gray-500 bg-blue-300 mx-7" : ""
        } flex-1 cursor-pointer text-lg`}
      >
        {task.task}
      </p>
      <div className="flex space-x-4">
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
          className="text-blue-500 cursor-pointer hover:text-blue-700"
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => deleteTodo(task.id)}
          className="text-red-500 cursor-pointer hover:text-red-700"
        />
      </div>
    </div>
  );
};

Todo.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }),
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};

export default Todo;
