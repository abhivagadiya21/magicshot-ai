import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./signin.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("ref") || "/";

  const handleSignIn = () => {
    navigate(redirectPath);
  };
  const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);

  setTimeout(() => {
    console.log("Logging in with:", { email, password });
     SignIn(email);
    setLoading(false);
  }, 800);
}

  return (
    <form onSubmit={handleSubmit} className="signin-form">
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

      <button type="submit" onClick={handleSignIn} className="form-submit-btn">Sign In</button>

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