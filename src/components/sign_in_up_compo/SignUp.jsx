const SignUp = () => {
  return (
    <form style={{ color: "#9c6fff", textDecoration: "none" }}>
      <input type="email" placeholder="Email Address" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm Password" />
      <input type="text" placeholder="Referral Code (Optional)" />
      <button>Create Account</button>
    </form>
  );
};

export default SignUp;
