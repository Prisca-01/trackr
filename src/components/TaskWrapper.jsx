// import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import TaskCalendar from "./Cal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
// import AddActivity from "../pages/AddActivity";

uuidv4();

const TaskWrapper = ({ username }) => {
  // const [selectedDate, setSelectedDate] = useState(
  //   new Date().toISOString().split("T")[0]
  // );
  return (
    <div className="TaskWrapper max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="mt-6">
        <h1 className="text-2xl font-bold mb-4">Hello {username},</h1>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Activity</h2>
          <Link to="/add-activity">
            {" "}
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300"
            >
              Add <FontAwesomeIcon icon={faPlus} />
            </button>
          </Link>
        </div>
      </div>
      {/* <TaskCalendar setSelectedDate={setSelectedDate} /> */}
      <TaskCalendar />

      <h1 className="text-2xl font-bold text-center mt-5 mb-4">Tasks</h1>
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Untracked</h1>
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
          <div>
            <h2 className="text-xl font-semibold">Coding</h2>
            <p className="text-gray-500">Description of Task 1</p>
          </div>
          <div>
          <Link to="/daily-entry">
            {" "}
            <button
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300"
            >
           <FontAwesomeIcon icon={faPlus} />
            </button>
          </Link>
            {/* <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300">
              Edit
            </button>
            <button className="p-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-300">
              Delete
            </button> */}
          </div>
        </div>
        </div>
      {/* <AddActivity selectedDate={selectedDate} /> */}
    </div>
  );
};
TaskWrapper.propTypes = {
  username: PropTypes.string.isRequired,
};
export default TaskWrapper;
