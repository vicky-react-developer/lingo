import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUserApi } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

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
    <main className="fixed inset-0 flex min-h-[100dvh] flex-col overflow-auto bg-[#146cf2] text-[#151515] font-[Arial,_Helvetica,sans-serif]">
      <section
        className="flex flex-1 justify-center items-center sm:items-start px-4 py-6 sm:px-6 sm:pt-[60px] sm:pb-8"
        aria-labelledby="admin-login-title"
      >
        <div className="w-full max-w-[658px] h-max overflow-hidden rounded-[5px] bg-white">
          <header className="grid min-h-[105px] sm:min-h-[123px] place-items-center border-b border-[#d5d5d5] bg-[#f7f7f7]">
            <h1 id="admin-login-title" className="m-0 text-[30px] sm:text-[35px] font-medium leading-none">
              Login
            </h1>
          </header>

          <form
            className="flex flex-col gap-5 p-[18px_16px] sm:p-[21px_20px_20px]"
            onSubmit={handleSubmit}
            noValidate
          >
            <label className="sr-only" htmlFor="admin-user-name">User Name</label>
            <input
              id="admin-user-name"
              name="userName"
              type="text"
              placeholder="User Name"
              autoComplete="username"
              value={formData.userName}
              onChange={handleChange}
              className="box-border w-full h-[58px] sm:h-[73px] px-4 border border-[#cbd2d9] rounded-[5px] outline-none text-[#171717] text-base sm:text-[18px] placeholder:text-[#171717] placeholder:opacity-100 focus:border-[#146cf2] focus:ring-[3px] focus:ring-[#146cf2]/[0.18]"
            />

            <label className="sr-only" htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className="box-border w-full h-[58px] sm:h-[73px] px-4 border border-[#cbd2d9] rounded-[5px] outline-none text-[#171717] text-base sm:text-[18px] placeholder:text-[#171717] placeholder:opacity-100 focus:border-[#146cf2] focus:ring-[3px] focus:ring-[#146cf2]/[0.18]"
            />

            {error && (
              <p role="alert" className="-mt-1 mb-0 text-[#b42318] text-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="self-start min-h-[47px] mt-2.5 px-[17px] border-0 rounded-[4px] bg-[#0d6efd] text-white text-[18px] cursor-pointer enabled:hover:bg-[#0b5ed7] disabled:cursor-wait disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <footer className="p-[23px_20px_22px] border-t border-[#d5d5d5] bg-[#f7f7f7] text-center text-base">
            <span>Need an account? </span>
            <Link to="/register" className="text-[#06f]">Sign up!</Link>
          </footer>
        </div>
      </section>

      <footer className="flex-none h-20 grid place-items-center bg-[#f7f7f7] text-base">
        Copyright © <a href="https://praistma.com" target="_blank" rel="noreferrer" className="text-[#06f]">Praistma Technologies</a> 2021
      </footer>
    </main>
  );
};

export default AdminLogin;