const SignUp = () => {
  return (
    <form>
      <input type="email" placeholder="Email Address" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm Password" />
      <input type="text" placeholder="Referral Code (Optional)" />
      <button>Create Account</button>
    </form>
  );
};

export default SignUp;
