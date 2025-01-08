import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tasksReducer from './taskSlice';
import dailyEntriesReducer from './dailyEntrySlice';
// import { composeWithDevTools } from 'redux-devtools-extension'; // Import DevTools extension

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
  dailyEntries: dailyEntriesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    // devTools: composeWithDevTools(),
  });

const persistor = persistStore(store);

persistor.purge();
export { store, persistor };
