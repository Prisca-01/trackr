import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const EditTask = ({ task, onUpdateTask, onClose }) => {
  const [taskName, setTaskName] = useState(task.name || "");
  const [taskType, setTaskType] = useState(task.type || "");
  const [taskValue, setTaskValue] = useState(task.value || "");
  const [taskTime, setTaskTime] = useState(task.time || "");
  const [taskDuration, setTaskDuration] = useState(
    task.duration || ""
  );
  const [startDate, setStartDate] = useState(task.startDate || "");
  const [endDate, setEndDate] = useState(task.endDate || "");
  const [description, setDescription] = useState(task.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      name: taskName,
      type: taskType,
      value: taskValue,
      time: taskTime,
      duration: taskDuration,
      startDate,
      endDate,
      description,
    };
    onUpdateTask(updatedTask);
    onClose();
  };

  const handleOtherInputChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setTaskValue(value);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-40">
      <div className="relative bg-white mt-8 p-4 mx-4 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-6 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-4 text-center">Edit Task</h1>
          <div className="mb-2">
            <label htmlFor="taskName" className="block text-gray-700">
              Task Name:
            </label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              value={taskName}
              required
              onChange={(e) => setTaskName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="selectTask" className="block text-gray-700">
              Type:
            </label>
            <select
              name="selectTask"
              id="selectTask"
              value={taskType}
              required
              onChange={(e) => setTaskType(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Select options
              </option>
              <option value="time">Time</option>
              <option value="duration">Duration</option>
              <option value="other">Number (Other)</option>
              <option value="checkmark">Checkmark</option>
            </select>
          </div>
          {taskType === "time" && (
            <div className="mb-2">
              <label htmlFor="taskTime" className="block text-gray-700">
                Max Time:
              </label>
              <input
                type="time"
                id="taskTime"
                name="taskTime"
                value={taskTime}
                onChange={(e) => setTaskTime(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          )}
          {taskType === "duration" && (
            <div className="mb-2">
              <label htmlFor="taskDuration" className="block text-gray-700">
                Duration (HH:MM):
              </label>
              <input
                type="time"
                id="taskDuration"
                name="taskDuration"
                value={taskDuration}
                onChange={(e) => setTaskDuration(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          )}
          {taskType === "other" && (
            <div className="mb-2">
              <label htmlFor="taskValue" className="block text-gray-700">
                Value:
              </label>
              <input
                type="text"
                id="taskValue"
                name="taskValue"
                value={taskValue}
                onChange={handleOtherInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          )}
          {taskType === "checkmark" && (
            <div className="mb-2">
              <label htmlFor="taskValue" className="block text-gray-700">
                Status:
              </label>
              <div className="flex items-center space-x-4">
                <label>
                  <input
                    type="radio"
                    name="taskValue"
                    value="done"
                    checked={taskValue === "done"}
                    onChange={(e) => setTaskValue(e.target.value)}
                  />{" "}
                  Done
                </label>
                <label>
                  <input
                    type="radio"
                    name="taskValue"
                    value="undone"
                    checked={taskValue === "undone"}
                    onChange={(e) => setTaskValue(e.target.value)}
                  />{" "}
                  Undone
                </label>
              </div>
            </div>
          )}
          <div className="mb-2">
            <label htmlFor="taskDate" className="block text-gray-700">
              Start Date:
            </label>
            <input
              type="date"
              id="taskDate"
              name="taskDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="taskEndDate" className="block text-gray-700">
              End Date:
            </label>
            <input
              type="date"
              id="taskEndDate"
              name="taskEndDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="taskDescription"
              className="block text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="taskDescription"
              name="taskDescription"
              rows="1"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-center">
            <input
              type="submit"
              value="Update Task"
              className="bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

EditTask.propTypes = {
  task: PropTypes.object.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditTask;
