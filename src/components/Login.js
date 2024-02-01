import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/zaloguj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        console.log("User logged in successfully");
        onLogin();
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  return (
    <div className="log_box">
      <div className="log_text">
        <h1>Login</h1>
        <p>
          Zaloguj sie do swojego konta żeby mieć dostęp do wszystkich funkcji
        </p>
        <Link to="/register" className="register">
          Rejestracja
        </Link>
      </div>
      <form>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Zaloguj</button>
      </form>
    </div>
  );
}
