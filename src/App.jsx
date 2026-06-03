import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import { AppContext } from "./context/AppContext";
import "./App.css";

function App() {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;