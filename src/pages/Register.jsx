import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    secret: "", // 👈 secret code for admin
  });

  const [message, setMessage] = useState("");

  // Input change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/register", formData);
      setMessage(res.data.msg || "Registration successful!");

      // Reset form
      setFormData({ name: "", email: "", password: "", secret: "" });

      // Redirect to login after 1 second
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setMessage(
        err.response?.data?.msg || "Something went wrong, please try again."
      );
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Register</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Secret Code */}
        <div className="mb-3">
          <label className="form-label">Secret Code (For Admin Only)</label>
          <input
            type="text"
            className="form-control"
            name="secret"
            value={formData.secret}
            onChange={handleChange}
            placeholder="Leave empty if student"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
