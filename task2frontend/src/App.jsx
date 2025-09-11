import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import IntroPage from "./pages/IntroPage";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Admin from "./pages/Admin/Admin";
import { useContext } from "react";
import Root from "./components/Root";

function App() {

  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
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
        </Route>
      </Routes>
    </Router>

  );
}

export default App;