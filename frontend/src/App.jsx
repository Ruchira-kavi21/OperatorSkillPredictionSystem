import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Predict from "./pages/Predict";
import Analytics from "./pages/Analytics";
import Shap from "./pages/Shap";
import Operators from "./pages/Operators";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/predict" element={<Predict />} />

        <Route path="/login" element={<Login />} />

        <Route path="/history" element={<History />} />

        <Route path="/analytics" element={<Analytics />} />

        <Route path="/shap" element={<Shap />} />

        <Route path="/operators" element={<Operators />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;