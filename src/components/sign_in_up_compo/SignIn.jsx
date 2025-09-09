import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./signin.css";

export default function SignIn({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("ref") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Login failed");
        setLoading(false);
        return;
      }

      const token = data.data?.token;
      console.log("Received token:", token);

      if (!token || typeof token !== "string") {
        toast.error("Invalid token received from server");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.data?.user?.id,
          email: data.data?.user?.email,
          token,
        })
      );

      if (typeof onLoginSuccess === "function") {
        onLoginSuccess(token);
      }

      toast.success("Logged in successfully ✅");
      navigate(redirectPath);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="signin-form">
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>

      <button type="submit" className="form-submit-btn" disabled={loading}>
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <div className="form-footer">
        <p
          className="forgot-link"
          onClick={() => navigate("/auth/forgot-password")}
        >
          Forgot Password
        </p>
      </div>
    </form>
  );
}
