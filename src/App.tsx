import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import Header from "./components/Header";
import "./assets/css/App.css";

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      <div className="app">
        <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
