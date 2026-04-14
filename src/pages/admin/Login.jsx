import React, { useState } from "react";
import styled from "styled-components";
import { adminApi } from "../../lib/adminApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminApi.login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrap>
      <div className="card">
        <h1>Admin Login</h1>
        <p className="sub">Sign in to manage site content.</p>
        <form onSubmit={onSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: var(--space-6);

  .card {
    width: min(420px, 100%);
    background: white;
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-2xl);
    padding: var(--space-8);
    box-shadow: var(--shadow-soft);
  }

  h1 {
    font-size: var(--text-3xl);
    margin-bottom: var(--space-2);
  }

  .sub {
    color: var(--color-dark-500);
    margin-bottom: var(--space-6);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  label {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-dark-700);
  }

  input {
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-dark-200);
    border-radius: var(--radius-lg);
  }

  button {
    padding: var(--space-3) var(--space-5);
    background: var(--gradient-primary);
    color: white;
    border-radius: var(--radius-full);
    font-weight: 600;
  }

  .error {
    color: #dc2626;
    background: rgba(220, 38, 38, 0.08);
    border: 1px solid rgba(220, 38, 38, 0.2);
    padding: var(--space-3);
    border-radius: var(--radius-lg);
  }
`;

export default Login;
