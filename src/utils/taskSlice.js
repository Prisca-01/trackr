import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  // initialState: [],
  initialState: JSON.parse(localStorage.getItem('tasks')) || [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state));
    },
    deleteTask: (state, action) => {
      const newState = state.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(newState));
      return newState;
    },
    trackTask: (state, action) => {
      const task = state.find(task => task.id === action.payload);
      if (task) {
        task.tracked = true;
        localStorage.setItem('tasks', JSON.stringify(state)); // Update localStorage
      }
    },
    updateTask: (state, action) => {
      const index = state.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
        localStorage.setItem('tasks', JSON.stringify(state)); // Update localStorage
      }
    }
  },
});


export const { addTask, deleteTask, trackTask, updateTask} = taskSlice.actions;
export default taskSlice.reducer;