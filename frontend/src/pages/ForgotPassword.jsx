import React, { useState } from "react";
import { ManSittingImg, LeftLeaf, RightLeaf, Logo } from "../helpers/Constants";
import "./ForgotPassword.css";
import { useNavigate, Link } from "react-router";
import { validatePhone } from "../helpers/utils";
import { forgotPasswordApi } from "../services/authService";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    userName: "",
    mobile: "",
    dob: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError("");
  };

  const validate = () => {
    for (const key in formData) {
      if (!formData[key]) {
        setError("Please fill all the fields");
        return false;
      }
    }
    if (!validatePhone(formData.mobile)) {
      setError("Please enter a valid mobile number");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setError("");

    try {
      // Server verifies identity and returns a short-lived reset token
      const response = await forgotPasswordApi(formData);
      // Pass the token to ResetPassword via navigation state (never in the URL)
      navigate("/reset-password", { state: { resetToken: response.resetToken } });
    } catch (err) {
      setError(err.message || "Verification failed. Please try again.");
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
            <label htmlFor="userName" className="input-label mont-semiBold">Username</label>
            <input
              type="text"
              id="userName"
              className="form-control login-input mb-3 mont-medium"
              placeholder="Username"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="mobile" className="input-label mont-semiBold">Mobile</label>
            <input
              type="number"
              id="mobile"
              className="form-control login-input mb-3 mont-medium"
              placeholder="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="dob" className="input-label mont-semiBold">Date of Birth</label>
            <input
              type="date"
              id="dob"
              className="form-control login-input mb-3 mont-medium"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          {error && <p className="text-danger text-center fs-12">{error}</p>}

          <button
            className="btn-login mont-semiBold fs-16 w-100 my-3"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Identity"}
          </button>
        </div>

          <div className="text-center pb-4 mont-medium fs-11 mt-3">
            <span className="account-text">Remember your password? </span>
            <Link className="signup-link" to="/login">Sign in</Link>
          </div>
      </div>
    </div>
  );
}