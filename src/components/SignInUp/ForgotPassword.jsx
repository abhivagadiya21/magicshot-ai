import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Reset link sent! (demo)");
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <h4>Reset Your Password</h4>

      <div className="form-group">
        <label>Email Address</label>
        <input type="email" placeholder="Enter your email" required />
      </div>

      <button type="submit" className="form-submit-btn">Send Reset Link</button>

      <button
        type="button"
        onClick={() => navigate("/auth/signin")}
        className="form-submit-btn"
        style={{ marginTop: "10px" }}
      >
        Back to Sign In
      </button>
    </form>
  );
};

export default ForgotPassword;