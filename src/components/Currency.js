import React, { useState, useEffect } from "react";
import "./Currency.css";
import usd from "./flags/united-states.png";
import eur from "./flags/european.png";
import aud from "./flags/australia.png";
import cad from "./flags/canada.png";
import { Link } from "react-router-dom";

const Currency = () => {
  const [currencyData, setCurrencyData] = useState([]);

  const showCurrency = () => {
    return currencyData.slice(0, 4);
  };

  const getFlagImage = (currencyCode) => {
    switch (currencyCode) {
      case "USD":
        return usd;
      case "EUR":
        return eur;
      case "AUD":
        return aud;
      case "CAD":
        return cad;
      default:
        return null;
    }
  };

  useEffect(() => {
    fetch("http://api.nbp.pl/api/exchangerates/tables/C/?format=json")
      .then((response) => response.json())
      .then((data) => {
        const rates = data[0].rates;
        const formattedData = rates.map((rate) => (
          <div key={rate.code} className="card">
            <div className="name">
              <img
                src={getFlagImage(rate.code)}
                alt={`${rate.code} flag`}
                className="flag"
              />
              {rate.code}
            </div>
            <div>Bid: {rate.bid}</div>
            <div>Ask: {rate.ask}</div>
          </div>
        ));
        setCurrencyData(formattedData);
      });
  }, []);

  return (
    <div className="currency-box">
      <h1>Atrakcyjne kursy dla 13 walut</h1>
      <div className="card-box">{showCurrency()}</div>
      <button>
        <Link to="/all">Pokaż wszyskie</Link>
      </button>
    </div>
  );
};

export default Currency;
