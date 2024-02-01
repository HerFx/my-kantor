import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { Link } from "react-router-dom";

export default function Rejestracja() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/rejestracja", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ FirstName, LastName, Email, Password }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("User registered successfully");
        navigate("/login");
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  return (
    <div className="log_box ">
      <form className="form">
        <input
          type="text"
          placeholder="Imię"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nazwisko"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={register}>Zarejestruj</button>
        <Link to="/" className="login">
          Masz już konto? Zaloguj się
        </Link>
      </form>
    </div>
  );
}
