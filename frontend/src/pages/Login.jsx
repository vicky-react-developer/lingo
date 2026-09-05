import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { loginUserApi } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import Field from "../components/Field";
import Button from "../components/Button";
import AuthUiTemplate from "../components/AuthUITemplate";

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
      if (response?.success) {
        login(response.token, response.data);
        navigate("/home");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthUiTemplate>
        <div className="-mt-[50px]">
          <Field
            type="text"
            name="userName"
            label="User Name"
            value={formData.userName}
            onChange={handleChange}
          />

          <Field
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          {error && (
            <p className="text-red-500 text-center text-xs mb-2">{error}</p>
          )}

          <Button
            onClick={handleSubmit}
            disabled={loading}
            loading={loading}
          >
            Sign in
          </Button>
        </div>

        <div className="text-center mt-3">
          <span className="text-white text-[11px] font-medium">
            Don't have an account?{" "}
          </span>
          <Link className="!text-[#00CCFF] text-[11px] font-medium underline" to="/register">
            Sign up
          </Link>
        </div>
        <div className="text-center mt-1 pb-4">
          <Link
            className="!text-[#00CCFF] text-[11px] underline cursor-pointer"
            to="/forgot-password"
          >
            Forgot Password
          </Link>
        </div>
      </AuthUiTemplate>
      <Footer backgroundColor="bg-[#030352]" textColor="text-white" />
    </>
  );
};

export default Login;