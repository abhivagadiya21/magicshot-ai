import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./signin.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("ref") || "/";

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const res = await fetch("http://192.168.1.8:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await res.json();
    console.log("Login success:", data);

    localStorage.setItem(
      "user",
      JSON.stringify({
        email: data.user?.email || email,
      })
    );

    window.dispatchEvent(new Event("userUpdated"));

    setLoading(false);
    navigate(redirectPath);
  } catch (err) {
    console.error(err);
    setError(err.message || "Something went wrong");
    setLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="signin-form">
      {error && <p className="error-msg">{error}</p>}

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

      <button
        type="submit"
        className="form-submit-btn"
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <div className="form-footer">
        <p
          className="forgot-link"
          onClick={() => navigate("/auth/forgot-password")}
        >
          Reset here
        </p>
      </div>
    </form>
  );
}

export default SignIn;
