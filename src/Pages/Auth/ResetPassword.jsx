import React, { useState } from "react";
import { useResetPasswordMutation } from "../../features/api/authApi"; // Import the resetPassword hook
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Logo from '../../../public/assets/images/logo/logo.png';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [newPasswordError, setNewPasswordError] = useState(""); // State for new password error
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // State for confirm password error
  const navigate = useNavigate();
  const location = useLocation();
  const notyf = new Notyf();

  // Get token from URL params
  const token = new URLSearchParams(location.search).get("token");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "newPassword") {
      setNewPassword(value);
      setNewPasswordError(""); // Clear error when user starts typing
    } else if (id === "confirmPassword") {
      setConfirmPassword(value);
      setConfirmPasswordError(""); // Clear error when user starts typing
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any general error

    // Validate the fields
    let hasError = false;

    if (!newPassword) {
      setNewPasswordError("New password is required");
      hasError = true;
    } else if (newPassword.length < 8) {
      setNewPasswordError("Password must be at least 8 characters");
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      hasError = true;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      hasError = true;
    }

    if (hasError) return; // Prevent form submission if there are errors

    try {
      // Trigger the reset password mutation
      await resetPassword({ token, newPassword }).unwrap();
      // Show success toast
      notyf.success("Password reset successfully.");
      // Redirect to the login page
      navigate("/login");
    } catch (err) {
      // Show error message
      notyf.error(err?.data?.message || "Failed to reset password. Please try again.");
    }
  };

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
                      src={Logo}
                      alt="reset-password logo"
                      onError={(e) => e.target.src = Logo} // Fallback to Logo if the image fails to load
                    />
                  </div>
                  <div className="signup-box-bottom">
                    <div className="signup-box-content">
                      <h4 className="mb-4">Reset Your Password</h4>
                      <form onSubmit={handleSubmit}>
                        {/* New Password Field */}
                        <div className="input-section password-section mb-3">
                          <label htmlFor="newPassword">New Password</label>
                          <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter new password"
                          />
                          {newPasswordError && <p className="text-danger">{newPasswordError}</p>}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="input-section password-section mb-4">
                          <label htmlFor="confirmPassword">Confirm Password</label>
                          <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Confirm new password"
                          />
                          {confirmPasswordError && <p className="text-danger">{confirmPasswordError}</p>}
                        </div>

                        {error && <p className="text-danger">{error}</p>}
                        <button type="submit" className="btn-default" disabled={isLoading}>
                          {isLoading ? "Setting Password..." : "Set New Password"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link className="close-button" to="/login">
            <i className="fa-sharp fa-regular fa-arrow-left" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
