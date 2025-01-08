// export const resetStore = () => ({
//   type: 'RESET_STORE',
// });



// export const fetchActivityStats = () => (dispatch, getState) => {
//   const { activities } = getState().activityStats || {};

//   if (!activities || activities.length === 0) {
//     console.error('No activities found');
//     return;
//   }

//   const selectedActivity = activities[0]; // Assuming 'Coding' is the selected activity
//   const entries = selectedActivity.entries || [];

//   if (entries.length === 0) {
//     console.error('No entries found for selected activity');
//     return;
//   }

//   const totalHours = entries.reduce((acc, entry) => acc + entry.value, 0);
//   const avgHours = (totalHours / entries.length).toFixed(2);
//   const activeDays = entries.filter(entry => !entry.break).length;
//   const longestStreak = Math.max(...entries.map(entry => entry.value));

//   const dailyHours = entries.map(entry => entry.value);

//   dispatch({
//     type: 'SET_ACTIVITY_STATS',
//     payload: {
//       activity: selectedActivity.name,
//       avgHours,
//       totalHours,
//       activeDays,
//       longestStreak,
//       dailyHours,
//     },
//   });
// };
