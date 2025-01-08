import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import TaskCalendar from "./Cal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faEdit,
  faChevronDown,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import AddTask from "../pages/AddTask";
import EditTask from "../pages/EditTask";
import AddEntry from "../pages/AddEntry";
import EditEntry from "../pages/EditEntry";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  trackTask,
  updateTask,
} from "../utils/taskSlice";
import { addDailyEntry, updateDailyEntry } from "../utils/dailyEntrySlice";
import { isWithinInterval, format } from "date-fns";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";

const TaskWrapper = ({ username, setSelectedDate }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [isEditingEntry, setIsEditingEntry] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const tasks = useSelector((state) => state.tasks);
  const dailyEntries = useSelector((state) => state.dailyEntries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const untrackedTasks = filteredTasks.filter(
    (task) => !task.tracked
  );
  const trackedTasks = filteredTasks.filter(
    (task) => task.tracked
  );
  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleAddTask = (newTask) => {
    dispatch(addTask({ id: uuidv4(), ...newTask }));
    setIsAddingTask(false);
  };

  const handleUpdateTask = (updatedTask) => {
    dispatch(updateTask(updatedTask));
    setIsEditingTask(false);
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleAddEntry = (taskId) => {
    setSelectedTask(
      tasks.find((task) => task.id === taskId)
    );
    setIsAddingEntry(true);
  };
  const handleSaveEntry = (newEntry) => {
    dispatch(addDailyEntry({ id: uuidv4(), ...newEntry }));
    dispatch(trackTask(newEntry.taskId));
    setIsAddingEntry(false);
    setSelectedTask(null);
  };
  const handleEditEntry = (entryId) => {
    const entry = dailyEntries.find((entry) => entry.id === entryId);
    if (entry) {
      setSelectedEntry(entry);
      setIsEditingEntry(true);
    }
  };

  const handleUpdateEntry = (updatedEntry) => {
    dispatch(updateDailyEntry(updatedEntry));
    setIsEditingEntry(false);
    setSelectedEntry(null);
  };

  const isEntryAdded = (taskId) => {
    const today = format(new Date(), "yyyy-MM-dd");
    return dailyEntries.some(
      (entry) => entry.taskId === taskId && entry.date === today
    );
  };
  const getLastEntryForToday = (taskId) => {
    const today = format(new Date(), "yyyy-MM-dd");
    const entriesForToday = dailyEntries.filter(
      (entry) => entry.taskId === taskId && entry.date === today
    );
    return entriesForToday[entriesForToday.length - 1]; // Get the last entry
  };

  const handleCloseForm = () => {
    setIsAddingTask(false);
    setIsEditingTask(false);
    setIsAddingEntry(false);
    setIsEditingEntry(false);
    setSelectedTask(null);
    setSelectedEntry(null);
    setDropdownOpen(null);
  };

  const filterTasksByDate = (selectedDate) => {
    if (!selectedDate) {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(
        tasks.filter((task) => {
          const taskStartDate = new Date(task.startDate);
          const taskEndDate = new Date(task.endDate);
          const date = new Date(selectedDate);
          return isWithinInterval(date, {
            start: taskStartDate,
            end: taskEndDate,
          });
        })
      );
    }
  };

  const handleDropdownToggle = (taskId) => {
    setDropdownOpen(dropdownOpen === taskId ? null : taskId);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsEditingTask(true);
  };

  const handleViewTaskDetails = (taskId) => {
    navigate(`/task/${taskId}`);
  };
  const handleViewTaskProgress = (taskId) => {
    navigate(`/task/${taskId}/progress`);
  };

  return (
    <div className="TaskWrapper max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="mt-6">
        <h1 className="text-2xl font-bold mb-4">Hello {username},</h1>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Task</h2>
          <button
            onClick={() => setIsAddingTask(true)}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faPlus} /> Add Task
          </button>
        </div>
      </div>
      <TaskCalendar
        setSelectedDate={setSelectedDate}
        filterTasksByDate={filterTasksByDate}
      />

      {isAddingTask && (
        <AddTask
          onAddTask={handleAddTask}
          onClose={handleCloseForm}
        />
      )}
      {isEditingTask && selectedTask && (
        <EditTask
          task={selectedTask}
          onUpdateTask={handleUpdateTask}
          onClose={handleCloseForm}
        />
      )}
      {isAddingEntry && selectedTask && (
        <AddEntry
          taskId={selectedTask.id}
          onAddEntry={handleSaveEntry}
          onClose={handleCloseForm}
        />
      )}
      {isEditingEntry && selectedEntry && (
        <EditEntry
          entry={selectedEntry}
          onUpdateEntry={handleUpdateEntry}
          onClose={handleCloseForm}
        />
      )}

      <h1 className="text-2xl font-bold text-center mt-5 mb-4">
        My Tasks
      </h1>
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold mb-4">Untracked Tasks</h2>
        {untrackedTasks.length === 0 ? (
          <p className="text-center text-gray-600">No tasks for the day</p>
        ) : (
          untrackedTasks.map((task) => (
            <div
              key={task.id}
              className="relative flex justify-between items-start bg-blue-200 p-4 rounded-lg mb-4"
            >
              <div className="flex items-center flex-grow">
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold mr-2">
                      {task.name}
                    </h3>
                    <div className="flex bg-sky-500">
                      <div className="relative bg-indigo-800">
                        <button
                          onClick={() => handleAddEntry(task.id)}
                          className="p-1 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-300"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                          <span className="ml-2">Add Entry</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-500 break-words">
                    {task.description}
                  </p>
                </div>
                <button
                  onClick={() => handleDropdownToggle(task.id)}
                  className="p-1 text-black -mt-6 text-sm rounded hover:bg-gray-500 transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>
                {dropdownOpen === task.id && (
                  <div className="absolute right-0 top-[-8rem] mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        handleTaskClick(task);
                        handleDropdownToggle(task.id);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Edit <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteTask(task.id);
                        handleDropdownToggle(task.id);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Delete <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-5">
        <h2 className="text-2xl font-bold mb-4">Tracked Tasks</h2>
        {trackedTasks.length === 0 ? (
          <p className="text-center text-gray-600">No tasks for the day</p>
        ) : (
          trackedTasks.map((task) => (
            <div
              key={task.id}
              className="relative flex justify-between items-start bg-green-200 p-4 rounded-lg mb-4"
            >
              <div className="flex items-center flex-grow">
                {isEntryAdded(task.id) ? (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-500 text-xl mr-2"
                  />
                ) : (
                  <span className="text-green-500 text-lg mr-2">⭕</span>
                )}

                <div className="flex flex-col flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold mr-2">
                      {task.name}
                    </h3>

                    {/* <div> */}
                    {!isEntryAdded(task.id) && (
                      <div className="relative bg-indigo-800">
                        <button
                          onClick={() => handleAddEntry(task.id)}
                          className="p-1 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-300"
                        >
                          {/* Add Entry */}
                          <FontAwesomeIcon icon={faPlus} />
                          <span className="ml-2">Add Entry</span>
                        </button>
                      </div>
                    )}
                    {/* </div> */}
                  </div>
                  <p className="text-gray-500">{task.description}</p>
                </div>
                <button
                  onClick={() => handleDropdownToggle(task.id)}
                  className="p-1 text-black -mt-6 text-sm rounded-lg hover:bg-gray-500 transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>
                {dropdownOpen === task.id && (
                  <div className="absolute right-0 top-[-8rem] mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {isEntryAdded(task.id) && (
                      <button
                        onClick={() => {
                          const lastEntry = getLastEntryForToday(task.id);
                          if (lastEntry) {
                            handleEditEntry(lastEntry.id);
                          }
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Edit Entry <FontAwesomeIcon icon={faEdit} />
                      </button>
                    )}
                    <button
                      onClick={() => handleViewTaskDetails(task.id)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      View Details <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      onClick={() => {
                        handleTaskClick(task);
                        handleDropdownToggle(task.id);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Edit Task <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteTask(task.id);
                        handleDropdownToggle(task.id);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Delete Task <FontAwesomeIcon icon={faTrash} />
                    </button>
                    {/*  */}
                    <button
                      onClick={() => handleViewTaskProgress(task.id)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      View Progress <FontAwesomeIcon icon={faEye} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

TaskWrapper.propTypes = {
  username: PropTypes.string.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
};

export default TaskWrapper;
