import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectTaskById } from "../utils/reducers";

const AddEntry = ({ taskId, onAddEntry = () => {}, onClose }) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [date, setDate] = useState(today);
  const [value, setValue] = useState("");
  const [isBreak, setIsBreak] = useState(false);
  const [comments, setComments] = useState("");

  // Fetch the task details using the taskId
  const task = useSelector((state) => selectTaskById(state, taskId));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isBreak) {
      setValue(""); // Clear value if it's a break day
    }

    const newEntry = {
      taskId,
      date,
      value,
      break: isBreak === "false",
      comments, // Add comments to the entry
    };

    if (typeof onAddEntry === "function") {
      onAddEntry(newEntry);
    }

    // Reset form fields
    setDate(today);
    setValue("");
    setIsBreak(false);
    setComments("");
    onClose();
  };

  // Customize input based on task type
  const valueInputMap = {
    time: (
      <div className="mb-4">
        <label htmlFor="value" className="block text-gray-700">
          Time Spent (HH:MM):
        </label>
        <input
          type="time"
          id="value"
          name="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required={!isBreak}
        />
      </div>
    ),
    duration: (
      <div className="mb-4">
        <label htmlFor="value" className="block text-gray-700">
          Duration (HH:MM):
        </label>
        <input
          type="time"
          id="value"
          name="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required={!isBreak}
        />
      </div>
    ),
    other: (
      <div className="mb-4">
        <label htmlFor="value" className="block text-gray-700">
          Value (Numbers only):
        </label>
        <input
          type="text"
          id="value"
          name="value"
          value={value}
          onChange={(e) => {
            // Accept only numbers
            const numericValue = e.target.value.replace(/\D/g, "");
            setValue(numericValue);
          }}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required={!isBreak}
        />
      </div>
    ),
    checkmark: (
      <div className="mb-4">
        <label htmlFor="value" className="block text-gray-700">
          Status:
        </label>
        <select
          id="value"
          name="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required={!isBreak}
        >
          <option value="">Select</option>
          <option value="done">Done</option>
          <option value="undone">Undone</option>
        </select>
      </div>
    ),
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
          <h1 className="text-2xl font-bold mb-4 text-center">Add Entry</h1>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700">
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              disabled
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Render the input based on task type */}
          {isBreak ? (
            <p className="text-red-500 text-center">
              You selected a break day. No input required!
            </p>
          ) : (
            valueInputMap[task.type] || null
          )}

          <div className="mb-4">
            <label htmlFor="break" className="block text-gray-700">
              Break Day?
            </label>
            <select
              id="break"
              name="break"
              value={isBreak}
              onChange={(e) => setIsBreak(e.target.value === "true")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {/* Comments Section */}
          <div className="mb-4">
            <label htmlFor="comments" className="block text-gray-700">
              Comments (Optional):
            </label>
            <textarea
              id="comments"
              name="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows="3"
            />
          </div>

          <div className="flex justify-center">
            <input
              type="submit"
              value="Add"
              className="bg-blue-500 text-white font-bold text-lg p-2 w-16 rounded-md cursor-pointer hover:bg-blue-600 transition-colors duration-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

AddEntry.propTypes = {
  taskId: PropTypes.string.isRequired,
  onAddEntry: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddEntry;
