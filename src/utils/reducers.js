// For Calculating Progress


import { createSelector } from '@reduxjs/toolkit';

// Selector to get all tasks
export const selectTasks = state => state.tasks;

// Selector to get all daily entries
export const selectDailyEntries = state => state.dailyEntries;

// Helper function to filter entries by date range
const filterEntriesByDateRange = (entries, daysBack) => {
  const now = new Date();
  return entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return (now - entryDate) / (1000 * 3600 * 24) <= daysBack;
  });
};

// Selector to calculate daily progress
export const selectDailyProgress = createSelector(
  [selectDailyEntries, (state, taskId) => taskId],
  (dailyEntries, taskId) => {
    const today = new Date().toISOString().split('T')[0];
    return dailyEntries
      .filter(entry => entry.taskId === taskId && entry.date === today)
      .reduce((sum, entry) => sum + entry.value, 0);
  }
);

// Selector to calculate weekly progress
export const selectWeeklyProgress = createSelector(
  [selectDailyEntries, (state, taskId) => taskId],
  (dailyEntries, taskId) => {
    const taskEntries = dailyEntries.filter(entry => entry.taskId === taskId);
    const weeklyEntries = filterEntriesByDateRange(taskEntries, 7); // Get entries within the last 7 days

    if (!weeklyEntries.length) return 0;

    const taskType = taskEntries[0]?.taskType; // Assuming taskType is available on each entry

    switch (taskType) {
      case 'time':
      case 'duration':
        return weeklyEntries.reduce((sum, entry) => sum + (parseFloat(entry.value) || 0), 0); // Sum of hours
      case 'checkmark':
        return weeklyEntries.filter(entry => entry.value).length; // Count active days
      case 'other':
        return weeklyEntries.reduce((sum, entry) => sum + (parseFloat(entry.value) || 0), 0); // Sum of units
      default:
        return 0;
    }
  }
);


// Selector to calculate monthly progress
export const selectMonthlyProgress = createSelector(
  [selectDailyEntries, (state, taskId) => taskId],
  (dailyEntries, taskId) => {
    const taskEntries = dailyEntries.filter(entry => entry.taskId === taskId);
    const monthlyEntries = filterEntriesByDateRange(taskEntries, 30); // Get entries within the last 30 days

    if (!monthlyEntries.length) return 0;

    const taskType = taskEntries[0]?.taskType; // Assuming taskType is available on each entry

    switch (taskType) {
      case 'time':
      case 'duration':
        return monthlyEntries.reduce((sum, entry) => sum + (parseFloat(entry.value) || 0), 0); // Sum of hours
      case 'checkmark':
        return monthlyEntries.filter(entry => entry.value).length; // Count active days
      case 'other':
        return monthlyEntries.reduce((sum, entry) => sum + (parseFloat(entry.value) || 0), 0); // Sum of units
      default:
        return 0;
    }
  }
);


// Selector to get a single activity by ID
export const selectTaskById = (state, taskId) => 
  state.tasks.find(task => task.id === taskId);

// Selector to get daily entries by activity ID
export const selectDailyEntriesByTask = (state, taskId) => 
  state.dailyEntries.filter(entry => entry.taskId === taskId);
