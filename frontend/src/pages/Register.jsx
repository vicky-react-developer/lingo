import React, { useState } from "react";
import "./Register.css";
import { useImmer } from "use-immer";
import { useNavigate, Link } from "react-router";
import { validatePhone } from "../helpers/utils";
import { registerUserApi } from "../services/authService";

const Register = () => {
  const [formData, setFormData] = useImmer({
    name: {
      label: "Name",
      value: "",
      type: "text",
    },
    fatherName: {
      label: "Father Name",
      value: "",
      type: "text",
    },
    gender: {
      label: "Gender",
      value: "",
      type: "select",
      options: [
        { label: "Male",   value: "Male"   },
        { label: "Female", value: "Female" },
        { label: "Other",  value: "Other"  },
      ],
    },
    role: {
      label: "Role",
      value: "",
      type: "select",
      options: [
        { label: "Student", value: "Student" },
        { label: "Faculty", value: "Faculty" },
      ],
    },
    age: {
      label: "Date of Birth",
      value: "",
      type: "date",
    },
    qualification: {
      label: "Qualification",
      value: "",
      type: "text",
    },
    organisation: {
      label: "Organisation",
      value: "",
      type: "text",
    },
    address: {
      label: "Address",
      value: "",
      type: "text",
    },
    place: {
      label: "Place",
      value: "",
      type: "text",
    },
    phoneNumber: {
      label: "Phone Number",
      value: "",
      type: "number",
      validation: (phone) => {
        if (!validatePhone(phone)) return "Enter a valid phone number";
        return null;
      },
    },
    userName: {
      label: "User Name",
      value: "",
      type: "text",
    },
    password: {
      label: "Password",
      value: "",
      type: "password",
    },
  });

  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((draft) => {
      draft[name].value = value;
    });
    if (error)   setError("");
    if (success) setSuccess("");
  };

  const validate = () => {
    for (const key in formData) {
      if (!formData[key].value) {
        setError(`Please enter the ${formData[key].label}`);
        return false;
      }
      if (
        formData[key].validation &&
        formData[key].validation(formData[key].value)
      ) {
        setError(formData[key].validation(formData[key].value));
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = Object.keys(formData).reduce((acc, key) => {
      acc[key] = formData[key].value;
      return acc;
    }, {});

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await registerUserApi(payload);
      setSuccess(response.message || "Registration successful! Redirecting to login...");

      // Reset form fields
      setFormData((draft) => {
        Object.keys(draft).forEach((key) => {
          draft[key].value = "";
        });
      });

      // Navigate to login after a short delay so user sees the success message
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="registration-wrapper d-flex justify-content-center align-items-center">
      <div className="registration-card shadow">
        <h2 className="form-title mont-semiBold">Registration</h2>

        <form className="reg-form" onSubmit={handleSubmit}>
          <div className="scrollable-content">
            {Object.keys(formData).map((key) => {
              const field = formData[key];

              switch (field.type) {
                case "select":
                  return (
                    <React.Fragment key={key}>
                      <label className="form-label">{field.label}</label>
                      <select
                        className="form-select form-input mb-4"
                        value={field.value}
                        name={key}
                        onChange={handleChange}
                      >
                        <option value="">Select...</option>
                        {field.options?.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </React.Fragment>
                  );

                default:
                  return (
                    <React.Fragment key={key}>
                      <label className="form-label">{field.label}</label>
                      <input
                        type={field.type}
                        className="form-control form-input mb-3"
                        placeholder={field.label}
                        value={field.value}
                        name={key}
                        onChange={handleChange}
                        {...(key === "age" && {
                          max: new Date().toISOString().split("T")[0],
                        })}
                      />
                    </React.Fragment>
                  );
              }
            })}
          </div>

          <div className="my-4">
            {error && (
              <p className="text-danger text-center fs-12">{error}</p>
            )}
            {success && (
              <p className="text-success text-center fs-12">{success}</p>
            )}

            <button
              className="btn-register w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <div className="text-center mt-3 mont-medium fs-11">
              <span className="account-text">Already have an account? </span>
              <Link className="signup-link" to="/login">Sign in</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;