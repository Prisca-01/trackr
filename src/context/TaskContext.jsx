import { createContext, useState } from 'react';
import PropTypes  from 'prop-types';
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const contextValue = {
    tasks,
    addTask,
  };

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
};

TaskProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
