import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    try {
      const response = await fetch("http://localhost:4000/balance");
      const data = await response.json();
      setBalance(data.AccountBalance);
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  useEffect(() => {
    getBalance();
    const refreshInterval = setInterval(() => {
      getBalance();
    }, 5000);
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="buttonContainer">
      <h2>Balans Konta: {balance} PLN</h2>
      <Link to="/" className="button">
        <div className="text">Home</div>
      </Link>
      <Link to="/Add" className="button">
        <div className="text">Dodaj środki</div>
      </Link>

      <Link to="/Buy" className="button">
        <div className="text">Kup walute</div>
      </Link>

      <Link to="/Sell" className="button">
        <div className="text">Sprzedaj walute</div>
      </Link>
      {/* <Link to="/Currency" className="button">
            <div className="text">Kursy</div>
          </Link>

          <Link to="/HistoryCurrency" className="button">
            <div className="text">Historia Kursów</div>
          </Link> */}
    </div>
  );
}
