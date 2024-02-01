import React, { useState } from "react";
import Navbar from "./Navbar";
import "./Add.css";
const Add = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);

  const handleAddBalance = async () => {
    try {
      const response = await fetch("http://localhost:4000/addBalance", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Add successfully:", data.message);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error during add:", error.message);
    }
  };

  return (
    <div className="container">
      <div>
        <Navbar />
        <form className="add">
          <h2>Zasil Konto</h2>
          <input
            placeholder="Kwota PLN"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholderTextColor="white"
            type="number"
          />
          {error && <div>{error}</div>}

          <button onClick={handleAddBalance}>
            <div>Zasil</div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
