import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted with:", { email, password });
    try {
      console.log("Sending POST to /auth/login...");
      const res = await API.post("/auth/login", { email, password });
      console.log("Login response:", res);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert(`Login failed: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div>
      <h2>Войти</h2>
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
        <button type="submit">Войти</button>
      </form>
      <p>
        нету аккаунта? <a href="/register">регистрация</a>
      </p>
    </div>
  );
}

export default Login;