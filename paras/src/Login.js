import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let formErrors = {};
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email address is invalid";
    }

    if (!formData.password) {
      formErrors.password = "Password is required";
    }

    if (storedUser) {
      if (formData.email !== storedUser.email || formData.password !== storedUser.password) {
        formErrors.credentials = "Invalid email or password";
      }
    } else {
      formErrors.credentials = "No account found. Please sign up.";
    }

    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setSubmitted(true);
      setErrors({});
      // Redirect to the dashboard or home page on successful login
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setErrors(formErrors);
      setSubmitted(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {submitted && <p className="success-msg">Login successful! Redirecting...</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email || errors.credentials ? "error-input" : ""}
            placeholder="Enter your email"
          />
          {errors.email && <p className="error-msg">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password || errors.credentials ? "error-input" : ""}
            placeholder="Enter your password"
          />
          {errors.password && <p className="error-msg">{errors.password}</p>}
          {errors.credentials && <p className="error-msg">{errors.credentials}</p>}
        </div>

        <button type="submit" className="login-btn">Log In</button>
        <button id="google-login" ><a href="https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Futm_source%3Dsign_in_no_continue%26pli%3D1%26nlr%3D1&ec=GAlAwAE&hl=en_GB&service=accountsettings&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S1211316509%3A1729920929255114&ddm=0">Login with Google</a></button>
        <button id="facbook-login"><a href="https://www.facebook.com/login/">Login with facebook</a></button>
        <button id="x-login"><a href="https://x.com/i/flow/login">Login with X</a></button>
      </form>
      <p className="redirect-text">
        Don't have an account?{" "}
        <Link to="/signup" className="redirect-link">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
