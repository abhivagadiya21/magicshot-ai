import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css"; // Optional: Custom styles if needed
import ForgotPassword from "./ForgotPassword";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can replace this with actual login API logic
    console.log("Logging in with:", { email, password });
    alert("Login successful (demo)!");

    // Optional: Redirect after login
    // navigate('/dashboard');
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
        />
      </div>

      <button type="submit" className="form-submit-btn">Sign In</button>

      <p className="form-footer">
        Forgot your password?{" "}
        <span
          className="forgot-link"
          onClick={() => navigate("/sign-in-up/forgot-password")}
        >
          Reset here
        </span>
      </p>
    </form>
  );
}

export default SignIn;
