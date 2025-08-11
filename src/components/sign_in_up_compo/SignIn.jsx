import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./signin.css"; 

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("ref") || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Logging in with:", { email, password });

    // 🔹 API call ya login logic yaha likh
    setTimeout(() => {
    setLoading(false);

      // ✅ LocalStorage ma user save kar (demo purpose)
      localStorage.setItem(
        "user",
        JSON.stringify({ email, credits: 10 })
      );

      navigate(redirectPath);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="signin-form">
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
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
          placeholder="Enter your password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>

      <button type="submit" className="form-submit-btn" disabled={loading}>
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <p className="form-footer">
        Forgot your password?{" "}
        <span
          className="forgot-link"
          onClick={() => navigate("/auth/forgot-password")}
        >
          Reset here
          
        </span>
        
      </p>
    </form>
  );
}

export default SignIn;
