import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.loggedIn) {
      // Redirect to the home or dashboard if already logged in
      navigate("/");
    }
  }, [navigate]);

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

    // Improved email validation
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email address is invalid";
    }

    // Improved password validation with minimum length check
    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    // Enhanced security: Avoid comparing plaintext passwords, use hashed passwords in real apps
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
      setIsLoading(true);
      setSubmitted(true);
      setErrors({});
      
      // Simulate login process
      setTimeout(() => {
        // Successful login logic
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          user.loggedIn = true;
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");  // Redirect to home or dashboard
        }
        setIsLoading(false);
      }, 2000);
    } else {
      setErrors(formErrors);
      setSubmitted(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      
      {submitted && !isLoading && <p className="success-msg">Login successful! Redirecting...</p>}
      
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
            disabled={isLoading}  // Disable input when loading
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
            disabled={isLoading}  // Disable input when loading
          />
          {errors.password && <p className="error-msg">{errors.password}</p>}
          {errors.credentials && <p className="error-msg">{errors.credentials}</p>}
        </div>

        <button type="submit" className="login-btn" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="redirect-text">
        Don't have an account?{" "}
        <Link to="/signup" className="redirect-link">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
