import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Routes */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

        {/* Protected Route */}
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;