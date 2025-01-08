import { createSlice } from '@reduxjs/toolkit';

const dailyEntriesSlice = createSlice({
  name: 'dailyEntries',
  // initialState: [],
  initialState: JSON.parse(localStorage.getItem('dailyEntries')) || [],
  reducers: {
    addDailyEntry: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('dailyEntries', JSON.stringify(state));
    },
    updateDailyEntry: (state, action) => {
      const index = state.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
        localStorage.setItem('dailyEntries', JSON.stringify(state));
      }
    },
    deleteDailyEntry: (state, action) => {
      const newState = state.filter(entry => entry.id !== action.payload);
      localStorage.setItem('dailyEntries', JSON.stringify(newState));
      return newState;
    }
  },
});

export const { addDailyEntry, updateDailyEntry, deleteDailyEntry } = dailyEntriesSlice.actions;
export default dailyEntriesSlice.reducer;