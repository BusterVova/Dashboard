import Dashboard from "./pages/dashboard/Dashboard";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Finalize from "./pages/finalize/Finalize";
import Results from "./pages/results/Results";
import React from "react";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/results/:testId" element={<Results />} />
        <Route path="/finalize/:testId" element={<Finalize />} />
      </Routes>
    </div>
  );
}

export default App;
