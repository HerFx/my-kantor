import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Add.css";

const Buy = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [buyingRate, setBuyingRate] = useState(null);
  const [saldo, setSaldo] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (currency) {
      fetch(
        `https://api.nbp.pl/api/exchangerates/rates/C/${currency}/?format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          const buyingRate = data.rates[0].bid;
          setBuyingRate(buyingRate);
        })
        .catch((error) => {
          console.error("Error fetching buying rate:", error);
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
    const quantityC = (amount / buyingRate).toFixed(2);
    setQuantity(quantityC);
  }, [amount, buyingRate]);

  const onSubmit = async (e) => {
    if (amount > saldo) {
      alert("Brak środków na koncie!");
    }
    if (amount <= saldo) {
      fetch("http://localhost:4000/buyCurrency", {
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
          console.error("Error during buy:", error.message);
        });

      const newSaldo = saldo - amount;

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
          console.log("Add successfully:", data.message);
        })
        .catch((error) => {
          console.error("Error during add:", error.message);
        });

      const checkResponse = await fetch(
        "http://localhost:4000/checkCurrencyBalance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currency,
          }),
        }
      );

      const checkData = await checkResponse.json();

      console.log("checkData:", checkData);

      if (checkData.exists) {
        const updateResponse = await fetch(
          "http://localhost:4000/updateCurrencyBalance",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              currency,
              quantity,
            }),
          }
        );

        if (updateResponse.ok) {
          console.log("Currency balance updated successfully.");
        } else {
          console.error("Error updating currency balance.");
        }
      } else {
        const updateResponse = await fetch(
          "http://localhost:4000/addCurrencyBalance",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              currency,
              quantity,
            }),
          }
        );
        if (updateResponse.ok) {
          console.log("Currency balance added successfully.");
        } else {
          console.error("Error adding currency balance.");
        }
      }
    }
  };

  return (
    <div className="container">
      <div>
        <Navbar />
        <form className="buy">
          <h2>Kupno Walut</h2>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">Dolar amerykański</option>
            <option value="AUD">Dolar australijski</option>
            <option value="CAD">Dolar kanadyjski</option>
            <option value="EUR">Euro</option>
            <option value="HUF">Forint</option>
            <option value="CHF">Frank Szwajcarski</option>
            <option value="GBP">Funt Szterling</option>
            <option value="JPY">Jen</option>
            <option value="CZK">Korona czeska</option>
            <option value="SEK">Korona szwedzka</option>
            <option value="NOK">Korona norweska</option>
            <option value="DKK">Korona duńska</option>
            <option value="XDR">SDR (MFW)</option>
          </select>

          <input
            placeholder="PLN"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholderTextColor="white"
            type="number"
          />
          <h3>Kurs kupna: {buyingRate ? buyingRate.toFixed(4) : "-"}</h3>
          <h3>Wybrana waluta: {currency}</h3>
          <h3>Ile dostaniesz: {quantity}</h3>
          <button onClick={onSubmit}>Kup</button>
        </form>
      </div>
    </div>
  );
};

export default Buy;
