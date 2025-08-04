import { Link } from "react-router-dom"; 
const SignIn = () => {
  return (
    <form style={{ color: "#9c6fff", textDecoration: "none" }}>
      <input type="email" placeholder="Email Address" />
      <input type="password" placeholder="Password" />
      <div style={{ textAlign: "right", marginBottom: "1rem" }}>
        <Link to="../forgot-password" style={{ color: "#9c6fff", textDecoration: "none" }}>Forgot Password?</Link>

      </div>
      <button>Login</button>
    </form>
  );
};

export default SignIn;
