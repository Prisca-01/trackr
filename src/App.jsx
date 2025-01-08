import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import AddTask from "./pages/AddTask";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from ".././src/utils/store";
import DailyEntry from "./pages/AddEntry";
import TaskDetails from "./pages/TaskDetails";
import ProgressSummary from "./pages/ProgressSummary";

const App = () => {
  const username = "John";

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route
              path="/dashboard"
              element={<Dashboard username={username} />}
            />{" "}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />{" "}
            <Route path="/add-task" element={<AddTask  />} />
            <Route path="/daily-entry" element={<DailyEntry />} />
            <Route path="/task/:taskId" element={<TaskDetails />} />
            <Route path="/task/:taskId/progress" element={<ProgressSummary />} />
            </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
