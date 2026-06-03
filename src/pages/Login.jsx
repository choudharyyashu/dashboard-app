import { useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./Login.css";

function Login() {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = useCallback(() => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
    login({ email, name: "Admin User" });
    navigate("/dashboard");
  }, [email, password, login, navigate]);

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Admin Login</h1>

        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Enter Email"
        />

        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="Enter Password"
        />

        {error && <p className="login-error">{error}</p>}

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
