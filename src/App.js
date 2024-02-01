import React, { useState, useEffect } from "react";
import "./App.css";
import Rejestracja from "./components/Rejestracja.js";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login.js";
import Buy from "./components/Buy.js";
import Add from "./components/Add.js";
import Main from "./components/Main.js";
import Currency from "./components/Currency.js";
import Sell from "./components/Sell.js";
import HistoryCurrency from "./components/HistoryCurrency.js";
import All from "./components/All.js";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="App">
      {/* {isLoggedIn ? (
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/add" element={<Add />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/currency" element={<Currency />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/HistoryCurrency" element={<HistoryCurrency />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Rejestracja />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      )} */}
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/add" element={<Add />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/currency" element={<Currency />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/all" element={<All />} />
          <Route path="/HistoryCurrency" element={<HistoryCurrency />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
