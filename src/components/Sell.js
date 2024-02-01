import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Add.css";

const Sell = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [sellingRate, setSellingRate] = useState(null);
  const [saldo, setSaldo] = useState("");
  const [quantity, setQuantity] = useState("");
  const [oldQuantity, setOldQuantity] = useState("");
  const [currencyBalance, setCurrencyBalance] = useState([]);

  useEffect(() => {
    // Fetch user's currency balance
    fetch("http://localhost:4000/currencyBalance")
      .then((response) => response.json())
      .then((data) => {
        setCurrencyBalance(data);
        if (data.length > 0) {
          setCurrency(data[0].Currency);
          setOldQuantity(data[0].Balance);
        }
      })
      .catch((error) => {
        console.error("Error fetching user's currency balance:", error);
      });
  }, []);

  useEffect(() => {
    if (currency) {
      fetch(
        `https://api.nbp.pl/api/exchangerates/rates/C/${currency}/?format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          const sellingRate = data.rates[0].ask;
          setSellingRate(sellingRate);
        })
        .catch((error) => {
          console.error("Error fetching selling rate:", error);
        });
    }
  }, [currency]);

  useEffect(() => {
    fetch("http://localhost:4000/balance")
      .then((response) => response.json())
      .then((data) => {
        setSaldo(data.AccountBalance);
      })
      .catch((error) => {
        console.error("Error fetching saldo:", error);
      });
  }, []);

  useEffect(() => {
    const quantityC = (amount * sellingRate).toFixed(2);
    setQuantity(quantityC);
  }, [amount, sellingRate]);

  const onSubmit = async (e) => {
    if (amount > oldQuantity) {
      alert("Brak środków na koncie!");
    }
    if (amount <= oldQuantity) {
      const newSaldo = parseFloat(saldo) + parseFloat(quantity);

      console.log("newSaldo:", newSaldo);

      fetch("http://localhost:4000/sellCurrency", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
          quantity,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
        })
        .catch((error) => {
          console.error("Error during sell:", error.message);
        });

      fetch("http://localhost:4000/subBalance", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newSaldo,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Subtract successfully:", data.message);
        })
        .catch((error) => {
          console.error("Error during subtract:", error.message);
        });

      const newQuantity = parseFloat(oldQuantity) - parseFloat(amount);

      console.log("newQuantity:", newQuantity);
      fetch("http://localhost:4000/updateSubCurrencyBalance", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currency,
          newQuantity,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Update successfully:", data.message);
        })
        .catch((error) => {
          console.error("Error during update:", error.message);
        });
    }
  };

  return (
    <div className="container">
      <div>
        <Navbar />
        <form className="sell">
          <h2 className="title">Sprzedaż Walut</h2>
          <select
            value={currency}
            onChange={(e) => {
              const selectedCurrency = e.target.value;
              const selectedCurrencyData = currencyBalance.find(
                (item) => item.Currency === selectedCurrency
              );
              setCurrency(selectedCurrency);
              setOldQuantity(
                selectedCurrencyData ? selectedCurrencyData.Balance : ""
              );
            }}
          >
            {currencyBalance.map((item) => (
              <option key={item.Currency} value={item.Currency}>
                {item.Currency}
              </option>
            ))}
          </select>
          <input
            placeholder="Ile chcesz sprzedać"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            // Update styles accordingly
          />
          <h3 className="rateText">
            Kurs sprzedaży: {sellingRate ? sellingRate.toFixed(4) : "-"}
          </h3>
          <h3 className="rateText">Wybrana waluta: {currency}</h3>
          <h3 className="rateText">Ile dostaniesz: {quantity}</h3>
          <h3 className="rateText">Stan konta waluty: {oldQuantity}</h3>
          <button className="button" onClick={onSubmit}>
            <div className="text">Sprzedaj</div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sell;
