import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import { AuthContext } from "./context/AuthContext";
import IntroPage from "./components/IntroPage";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Admin from "./components/Admin";
import { useContext } from "react";

function App() {

  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/admin" element={user?.role === 'admin' ? <Admin /> : <Navigate to='/' />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;