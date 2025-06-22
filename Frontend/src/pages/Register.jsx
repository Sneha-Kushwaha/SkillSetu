// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🔗 Replace with real backend registration logic
      alert("Account created! Please log in.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <form onSubmit={handleSubmit} className="p-8 bg-gray-100 rounded-lg w-full max-w-sm shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
        />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Register
        </button>
        <p className="text-sm mt-4 text-center">
          Already have an account? <a className="text-blue-500" href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
