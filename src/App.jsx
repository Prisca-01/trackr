import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import AddActivity from "./pages/AddActivity";
import { TaskProvider } from './context/TaskContext';
import DailyEntry from "./pages/DailyEntry";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const username = "John";

  return (
    <TaskProvider>
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
        <Route path="/add-activity" element={<AddActivity />} />
        <Route path="/daily-entry" element={<DailyEntry />} />
      </Routes>
    </Router>
    </TaskProvider>
  );
};

export default App;
