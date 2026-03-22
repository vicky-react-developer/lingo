import React, { useState } from "react";
import { ManSittingImg, LeftLeaf, RightLeaf, GMail, Facebook } from "../helpers/Constants";
import "./Login.css";
import { useNavigate, Link } from "react-router";
import { loginUserApi } from "../services/authService";

const Login = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [error,   setError]   = useState("");
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
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setError("");

    try {
      const response = await loginUserApi(formData);
      // Persist token so other pages can use it
      localStorage.setItem("token", response.token);
      localStorage.setItem("user",  JSON.stringify(response.data));
      navigate("/home");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="text-center mt-4">
        <h1 className="brand-title mont-italic">
          Lingo<span className="mont-boldItalic">Refresh</span>
        </h1>
        <p className="brand-subtitle mont-italic fs-14">Refresh your spoken english</p>
      </div>

      <div className="position-relative">
        <img src={LeftLeaf}  alt="illustration" className="left-leaf"  />
        <img src={RightLeaf} alt="illustration" className="right-leaf" />
      </div>

      <div className="illustration-box text-center">
        <img src={ManSittingImg} alt="illustration" className="illustration-img" />
      </div>

      <div className="bottom-card">
        <div className="container px-4">

          <input
            type="text"
            className="form-control login-input mb-3 mont-medium"
            placeholder="Username"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />

          <input
            type="password"
            className="form-control login-input mb-4 mont-medium"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          {error && <p className="text-danger text-center fs-12">{error}</p>}

          <button
            className="btn-login mont-semiBold fs-16 w-100 mb-3"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="text-center mb-4">
            <p
              className="forgot-link mont-regular fs-11 clickable"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot your password?
            </p>
          </div>

          <div className="text-center mb-3">
            <span className="connect-text fs-11 mont-medium">or connect with</span>
          </div>

          <div className="d-flex justify-content-center align-items-center gap-4 mb-4">
            <img src={Facebook} alt="facebook" className="social-icon" />
            <div className="divider"></div>
            <img src={GMail}    alt="gmail"    className="social-icon" />
          </div>

          <div className="text-center pb-4 mont-medium fs-11">
            <span className="account-text">Don't have an account? </span>
            <Link className="signup-link" to="/register">Sign up</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;