// Works for Task Details- DO NOT REMOVE!

import { createSelector } from 'reselect';

// Selector to get tasks from state
const selectTasks = (state) => state.tasks;

// Selector to get daily entries from state
const selectDailyEntries = (state) => state.dailyEntries;

// Memoized selector to get a specific task by ID
export const selectTaskById = (taskId) =>
  createSelector(
    [selectTasks],
    (tasks) => tasks.find((task) => task.id === taskId)
  );

// Memoized selector to get entries for a specific task ID
export const selectEntriesByTaskId = (taskId) =>
  createSelector(
    [selectDailyEntries],
    (entries) => entries.filter((entry) => entry.taskId === taskId)
  );
