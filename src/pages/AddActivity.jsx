import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AddActivity = () => {
//   const navigate = useNavigate();

  const [activityName, setActivityName] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityValue, setActivityValue] = useState("");
  const [activityTime, setActivityTime] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  //   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newActivity = {
//       name: activityName,
//       type: activityType,
//       value: activityValue,
//       time: activityTime,
//       duration: activityDuration,
//       startDate: startDate,
//       endDate: endDate,
//       description: description,
//     };
//     addActivity(newActivity);
//     navigate("/dashboard"); // Corrected navigation
//     // Reset form fields
//     setActivityName("");
//     setActivityType("");
//     setActivityValue("");
//     setActivityTime("");
//     setActivityDuration("");
//     setStartDate("");
//     setEndDate("");
//     setDescription("");
//   };

  const handleTypeChange = (e) => {
    setActivityType(e.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        // onSubmit={handleSubmit}
        action="/dashboard"
        className="bg-white p-8 rounded shadow-md w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Add Activity</h1>
        <div className="mb-4">
          <label htmlFor="activityName" className="block text-gray-700">
            Activity Name:
          </label>
          <input
            type="text"
            id="activityName"
            name="activityName"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="selectActivity" className="block text-gray-700">
            Type:
          </label>
          <select
            name="selectActivity"
            id="selectActivity"
            value={activityType}
            onChange={handleTypeChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="select" disabled>
              Select options
            </option>
            <option value="time">Time</option>
            <option value="duration">Duration</option>
            <option value="other">Number (Other)</option>
            <option value="checkmark">Checkmark</option>
          </select>
        </div>
        {activityType === "time" && (
          <div className="mb-4">
            <label htmlFor="activityTime" className="block text-gray-700">
              Max Time:
            </label>
            <input
              type="time"
              id="activityTime"
              name="activityTime"
              value={activityTime}
              onChange={(e) => setActivityTime(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        )}
        {activityType === "duration" && (
          <div className="mb-4">
            <label htmlFor="activityDuration" className="block text-gray-700">
              Duration (Hours):
            </label>
            <input
              type="number"
              id="activityDuration"
              name="activityDuration"
              value={activityDuration}
              onChange={(e) => setActivityDuration(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        )}
        {(activityType === "other" || activityType === "checkmark") && (
          <div className="mb-4">
            <label htmlFor="activityValue" className="block text-gray-700">
              Value:
            </label>
            <input
              type="text"
              id="activityValue"
              name="activityValue"
              value={activityValue}
              onChange={(e) => setActivityValue(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="activityDate" className="block text-gray-700">
            Start Date:
          </label>
          <input
            type="date"
            id="activityDate"
            name="activityDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="activityEndDate" className="block text-gray-700">
            End Date:
          </label>
          <input
            type="date"
            id="activityEndDate"
            name="activityEndDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="activityDescription" className="block text-gray-700">
            Description:
          </label>
          <textarea
            id="activityDescription"
            name="activityDescription"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-center">
          <input
            type="submit"
            value="Submit"
            className="bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600"
          />
        </div>
      </form>
    </div>
  );
};

AddActivity.propTypes = {
  onAddActivity: PropTypes.func.isRequired,
};

export default AddActivity;
