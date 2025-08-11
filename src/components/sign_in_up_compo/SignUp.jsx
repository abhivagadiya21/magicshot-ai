import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {


  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("ref") || "/";
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


  const handleSignUp = (e) => {
    e.preventDefault();

    // 🔐 Your sign-up logic here (call API, validate, etc.)
    // On success:
    navigate(redirectPath);
  };

  return (
    <form className="signin-form" onSubmit={handleSignUp}>
      <div className="form-group">
        <label>Email Address</label>
        <input 
        className="form-group" 
        type="email" 
        placeholder="Email Address" 
        onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input 
        className="form-group" 
        type="password" 
        placeholder="Password" 
       onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Confirm Password</label>
        <input 
        className="form-group" 
        type="password" 
        placeholder="Confirm Password" 
        />
      </div>
      <div className="form-group">
        <label>Referral Code</label>
        <input 
        className="form-group" 
        type="text" 
        placeholder="Referral Code (Optional)" 
        />
      </div>


      <button type="submit" className="form-submit-btn">Create Account</button>
    </form>
  );
};

export default SignUp;
