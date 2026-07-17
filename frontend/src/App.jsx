import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Predict from "./pages/Predict";
import Analytics from "./pages/Analytics";
import Shap from "./pages/Shap";
import Operators from "./pages/Operators";
import Unauthorized from "./pages/Unauthorized";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "IE"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/predict"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "IE", "SUPERVISOR"]}>
              <Predict />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "IE", "SUPERVISOR"]}>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "IE"]}>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shap"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "IE"]}>
              <Shap />
            </ProtectedRoute>
          }
        />

        <Route
          path="/operators"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "IE"]}>
              <Operators />
            </ProtectedRoute>
          }
        />
        <Route
            path="/unauthorized"
            element={<Unauthorized />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
