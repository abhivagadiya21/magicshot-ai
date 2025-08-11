import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css"; // Optional: Custom styles if needed

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("ref") || "/";


  const handleSignIn = () => {
    // ✅ Login logic here
    navigate(redirectPath);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    alert("Login successful (demo)!");
  };

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
        />
      </div>

      <button type="submit" onClick={handleSignIn} className="form-submit-btn">Sign In</button>

      <div className="form-footer">
        <p
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