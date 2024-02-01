import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Currency from "./Currency";
import Navbar from "./Navbar";

const Main = ({ history }) => {
  const [currencyBalance, setCurrencyBalance] = useState([]);

  const getCurrencyBalance = async () => {
    try {
      const response = await fetch("http://localhost:4000/currencyBalance");
      const data = await response.json();
      setCurrencyBalance(data);
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  useEffect(() => {
    getCurrencyBalance();
    const refreshInterval = setInterval(() => {
      getCurrencyBalance();
    }, 5000);
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="container">
      <div>
        <Navbar />
        <div className="accounts">
          {currencyBalance.length > 0 ? (
            <div className="account-box">
              {currencyBalance.map((currencyBalance) => (
                <div className="account">
                  <div className="account__currency">
                    <h3>{currencyBalance.Currency}</h3>
                  </div>
                  <div className="account__balance">
                    <h3>{currencyBalance.Balance}</h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="account-text">
              <p>Nie masz jeszcze żadnych kont</p>
              <Link to="/buy" className="add-btn">
                Dodaj konto
              </Link>
            </div>
          )}
        </div>

        <Currency />
      </div>
    </div>
  );
};

export default Main;
