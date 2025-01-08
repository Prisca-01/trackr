import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faHourglassHalf,
  faCheckCircle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { selectTaskById, selectEntriesByTaskId } from "../utils/selectors";

const TaskDetails = () => {
  const { taskId } = useParams();
  const task = useSelector((state) => selectTaskById(taskId)(state));
  const entries = useSelector((state) =>
    selectEntriesByTaskId(taskId)(state)
  );

  if (!task) return <p>Task not found.</p>;

  return (
    <div className="flex justify-center p-4 mt-10 bg-gray-200 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mt-10">
        <h1 className="text-3xl font-bold mb-6 border-b-2 border-blue-500 pb-2 text-center text-blue-700">
          Task Details
        </h1>

        {/* Task Details */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 flex items-center">
            <FontAwesomeIcon icon={faCalendar} className="mr-2 text-blue-600" />
            {task.name}
          </h2>
          <p className="text-gray-700 mb-2 flex items-center">
            <FontAwesomeIcon icon={faCalendar} className="mr-2 text-gray-500" />
            {task.description}
          </p>
          <p className="text-gray-500 mb-2 flex items-center">
            <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-400" />
            Start Date: {format(new Date(task.startDate), "MMM dd, yyyy")}
          </p>
          <p className="text-gray-500 mb-4 flex items-center">
            <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-400" />
            End Date: {format(new Date(task.endDate), "MMM dd, yyyy")}
          </p>

          {/* Conditional Rendering based on TaskType */}
          {task.type === "time" && (
            <div className="mb-4 flex items-center">
              <FontAwesomeIcon icon={faClock} className="mr-2 text-green-500" />
              <p>Max Time: {task.time}</p>
            </div>
          )}
          {task.type === "duration" && (
            <div className="mb-4 flex items-center">
              <FontAwesomeIcon
                icon={faHourglassHalf}
                className="mr-2 text-yellow-500"
              />
              <p>Duration (Hours): {task.duration}</p>
            </div>
          )}
          {(task.type === "other" || task.type === "checkmark") && (
            <div className="mb-4 flex items-center">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="mr-2 text-blue-500"
              />
              <p>Value: {task.value}</p>
            </div>
          )}
        </div>

        {/* Entries List */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 text-blue-700">
            <FontAwesomeIcon icon={faCheck} className="mr-2 text-green-500" />
            Entries
          </h2>
          {entries.length === 0 ? (
            <p className="text-gray-600">No entries for this task.</p>
          ) : (
            <ul className="list-disc pl-5">
              {entries.map((entry) => (
                <li
                  key={entry.id}
                  className="mb-4 p-4 bg-gray-100 rounded-md shadow-sm"
                >
                  <p className="flex items-center mb-2">
                    <FontAwesomeIcon
                      icon={faCalendar}
                      className="mr-2 text-gray-500"
                    />
                    <strong>Date: </strong> {entry.date}
                  </p>
                  <p className="flex items-center mb-2">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="mr-2 text-gray-500"
                    />
                    <strong>Value: </strong> {entry.value}
                  </p>
                  <p className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="mr-2 text-gray-500"
                    />
                    <strong>Break Day: </strong> {entry.break ? "Yes" : "No"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

TaskDetails.propTypes = {
  taskId: PropTypes.string.isRequired,
};

export default TaskDetails;
