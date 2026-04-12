import React, { useState } from "react";
import { ManSittingImg, LeftLeaf, RightLeaf, GMail, Facebook, Logo } from "../helpers/Constants";
import "./Login.css";
import { useNavigate, Link } from "react-router";
import { loginUserApi } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

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
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setError("");

    try {
      const response = await loginUserApi(formData);
      login(response.token, response.data);
      navigate("/home");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
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
          <label className="input-label mont-semiBold">Username</label>
          <input
            type="text"
            className="form-control login-input mb-3 mont-medium"
            placeholder="Username"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
          <label className="input-label mont-semiBold">Password</label>
          <input
            type="password"
            className="form-control login-input mb-4 mont-medium"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {error && (
            <p className="text-danger text-center fs-12">{error}</p>
          )}
          <button
            className="btn-login mont-semiBold fs-16 w-100 mb-3"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>

        <div className="text-center mt-3">
          <span className="account-text mont-medium fs-11">Don't have an account? </span>
          <Link className="signup-link fs-11" to="/register">Sign up</Link>
        </div>
        <div className="text-center mt-1 pb-4">
          <span className="forgot-link mont-regular fs-11 clickable" onClick={() => navigate("/forgot-password")}>
            Forgot Password
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
