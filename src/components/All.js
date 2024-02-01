import React, { useState, useEffect } from "react";
import "./Currency.css";
import Navbar from "./Navbar";

const Currency = () => {
  const [currencyData, setCurrencyData] = useState([]);

  useEffect(() => {
    fetch("http://api.nbp.pl/api/exchangerates/tables/C/?format=json")
      .then((response) => response.json())
      .then((data) => {
        const rates = data[0].rates;
        const formattedData = rates.map((rate) => (
          <div key={rate.code} className="card">
            <div>{rate.code}</div>
            <div>Bid: {rate.bid}</div>
            <div>Ask: {rate.ask}</div>
          </div>
        ));
        setCurrencyData(formattedData);
      });
  }, []);

  return (
    <div className="container">
      <div>
        <Navbar />
        <div className="currency-box currency-box-all">
          <h1>Attractive rates for 13 currencies</h1>
          <div className="card-box">{currencyData}</div>
        </div>
      </div>
    </div>
  );
};

export default Currency;
