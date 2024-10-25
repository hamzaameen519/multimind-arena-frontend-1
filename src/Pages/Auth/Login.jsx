import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Helpers from "../../Config/Helpers";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";
import { useLoginMutation } from "../../features/api/authApi"; // Import the login mutation

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Using the login mutation
  const [login, { isLoading }] = useLoginMutation(); // Hook for login mutation
  const [error, setError] = useState(null); // Local error state

  // Local State for form data
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle successful login
  const handleLoginSuccess = (userData) => {
    const notyf = new Notyf();
    notyf.success("Logged In Successfully");

    // Save user in Redux store
    dispatch(setUser({ user: userData.user, token: userData.token }));

    // Save user data in localStorage
    Helpers.setItem("user", JSON.stringify(userData.user));
    Helpers.setItem("type", userData.user.isAdmin);
    Helpers.setItem("token", userData.token);

    // Redirect based on user role
    if (userData.user.isAdmin) {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  // Handle form submission using login mutation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset the error

    // Check for empty fields
    if (!formData.email || !formData.password) {
      setError("Both fields are required");
      return;
    }

    try {
      // Trigger the login mutation
      const userData = await login(formData).unwrap(); // `unwrap` to handle the fulfilled/rejected state manually
      handleLoginSuccess(userData); // Handle login success
    } catch (err) {
      // Handle login error
      setError(
        err?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    const googleLoginUrl =
      "https://chat-arena-backend-4ba91b3feb6b.herokuapp.com/google-auth";
    window.location.href = googleLoginUrl;
  };

  // Handle Google OAuth redirection
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const user = queryParams.get("user");

    if (token && user) {
      try {
        const userObj = JSON.parse(user);
        handleLoginSuccess({ user: userObj, token });
      } catch (error) {
        setError("Failed to log in with Google. Please try again.");
      }
    }
  }, [location]);

  return (
    <div>
      <main className="page-wrapper">
        <div className="signup-area">
          <div className="wrapper">
            <div className="row">
              <div className="col-lg-6 bg-color-blackest left-wrapper">
                <div className="sign-up-box">
                  <div className="signup-box-top">
                    <img
                      src="assets/images/logo/logo.png"
                      alt="sign-up logo"
                      style={{ height: "80px", width: "auto" }}
                    />
                  </div>
                  <div className="signup-box-bottom">
                    <div className="signup-box-content">
                      <div className="social-btn-grp">
                        <button
                          className="btn-default btn-border"
                          onClick={handleGoogleLogin}
                        >
                          <span className="icon-left">
                            <img
                              src="assets/images/sign-up/google.png"
                              alt="Google Icon"
                            />
                          </span>
                          Continue with Google
                        </button>
                      </div>
                      <div className="text-social-area">
                        <hr />
                        <span>Or continue with</span>
                        <hr />
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="input-section mail-section">
                          <div className="icon">
                            <i className="fa-sharp fa-regular fa-envelope" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="input-section password-section">
                          <div className="icon">
                            <i className="fa-sharp fa-regular fa-lock" />
                          </div>
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="forget-text">
                          <Link className="btn-read-more" to="/forgot-password">
                            <span>Forgot password</span>
                          </Link>
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                        <button
                          type="submit"
                          className="btn-default"
                          disabled={isLoading}
                        >
                          {isLoading ? "Signing In..." : "Sign In"}
                        </button>
                      </form>
                    </div>
                    <div className="signup-box-footer">
                      <div className="bottom-text">
                        Don't have an account?{" "}
                        <Link className="btn-read-more ml--5" to="/register">
                          <span>Sign Up</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link className="close-button" to="/">
            <i className="fa-sharp fa-regular fa-arrow-left" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Login;
