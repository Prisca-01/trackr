import { useState } from "react";
import PropTypes from "prop-types";
import TaskWrapper from "../components/TaskWrapper";

const Dashboard = () => {
  const username = "John";
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="mt-6">
          <TaskWrapper
            username={username}
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Dashboard;
