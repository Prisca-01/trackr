// src/context/TaskContext.jsx
import { createContext, useState } from 'react';
import PropTypes  from 'prop-types';
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  const addActivity = (newActivity) => {
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

  const contextValue = {
    activities,
    addActivity,
  };

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
};

TaskProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
