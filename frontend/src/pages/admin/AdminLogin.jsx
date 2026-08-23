import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUserApi } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((current) => ({ ...current, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.userName.trim() || !formData.password) {
      setError("Please enter your user name and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await loginUserApi(formData);
      if (response?.success) {
        login(response.token, response.data);
        navigate("/admin");
        return;
      }
      setError(response?.message || "Unable to sign in. Please try again.");
    } catch (err) {
      setError(err.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-shell">
      <section className="admin-login-content" aria-labelledby="admin-login-title">
        <div className="admin-login-card">
          <header className="admin-login-header"><h1 id="admin-login-title">Login</h1></header>
          <form className="admin-login-form" onSubmit={handleSubmit} noValidate>
            <label className="visually-hidden" htmlFor="admin-user-name">User Name</label>
            <input id="admin-user-name" name="userName" type="text" placeholder="User Name" autoComplete="username" value={formData.userName} onChange={handleChange} />
            <label className="visually-hidden" htmlFor="admin-password">Password</label>
            <input id="admin-password" name="password" type="password" placeholder="Password" autoComplete="current-password" value={formData.password} onChange={handleChange} />
            {error && <p className="admin-login-error" role="alert">{error}</p>}
            <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
          </form>
          <footer className="admin-login-card-footer"><span>Need an account? </span><Link to="/register">Sign up!</Link></footer>
        </div>
      </section>
      <footer className="admin-login-page-footer">Copyright © <a href="https://praistma.com" target="_blank" rel="noreferrer">Praistma Technologies</a> 2021</footer>
    </main>
  );
};

export default AdminLogin;
