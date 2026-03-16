import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Register form submitted with:", { email, password });
    try {
      console.log("Sending POST to /auth/register...");
      const res = await API.post("/auth/register", { email, password });
      console.log("Registration response:", res);
      alert("Registered successfully! Please login.");
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      alert(`Registration failed: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Регистрация</button>
      </form>
      <p>
        у вас уже есть аккаунт? <a href="/">Войти</a>
      </p>
    </div>
  );
}

export default Register;