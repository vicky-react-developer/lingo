import React, { useState } from "react";
import { ManSittingImg, LeftLeaf, RightLeaf, Logo } from "../helpers/Constants";
import "./ForgotPassword.css";   // reuses the same stylesheet
import { useNavigate, useLocation, Link } from "react-router";
import { resetPasswordApi } from "../services/authService";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // resetToken was placed in navigation state by ForgotPassword
  const resetToken = location.state?.resetToken;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError("");
  };

  const validate = () => {
    if (!formData.password || !formData.confirmPassword) {
      setError("Please fill all the fields");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!resetToken) {
      setError("Invalid session. Please go back and verify your identity first.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setError("");

    try {
      await resetPasswordApi({ resetToken, newPassword: formData.password });
      setSuccess("Password updated successfully!");
      // Redirect to login after a short delay so the user sees the success message
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setError(err.message || "Reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="text-center mt-4">
        <img src={Logo} alt="logo" className="logo-icon" />
        <h1 className="brand-title mont-boldItalic">
          <span className="brand-lingo">Lingo</span><span className="brand-refresh">Refresh</span>
        </h1>
        <p className="brand-subtitle mont-italic fs-14">Refresh your spoken english</p>
      </div>


      <div className="bottom-card">
        <div className="position-relative illustration-box">
          <img src={LeftLeaf} alt="illustration" className="left-leaf" />
          <div className="text-center">
            <img src={ManSittingImg} alt="illustration" className="illustration-img" />
          </div>
          <img src={RightLeaf} alt="illustration" className="right-leaf" />
        </div>

        <div className="login-form">

          <div>
            <label htmlFor="password" className="input-label mont-semiBold">New Password</label>
            <input
              type="password"
              id="password"
              className="form-control login-input mb-3 mont-medium"
              placeholder="New Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="input-label mont-semiBold">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control login-input mb-3 mont-medium"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-danger text-center fs-12">{error}</p>}
          {success && <p className="text-success text-center fs-12">{success}</p>}

          <button
            className="btn-login mont-semiBold fs-16 w-100 my-3"
            onClick={handleSubmit}
            disabled={loading || !!success}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

          <div className="text-center pb-4 mont-medium fs-11 mt-3">
            <span className="account-text">Remember your password? </span>
            <Link className="signup-link" to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}