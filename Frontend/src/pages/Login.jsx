import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🔗 Replace this with real API call
      const mockUser = {
        name: "Unnati",
        email: formData.email,
        role: formData.email === "admin@skillsetu.com" ? "admin" : "user",
      };

      login(mockUser);
      navigate(mockUser.role === "admin" ? "/dashboard/admin" : "/dashboard/user");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <form onSubmit={handleSubmit} className="p-8 bg-gray-100 rounded-lg w-full max-w-sm shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
        <p className="text-sm mt-4 text-center">
          Don’t have an account? <a className="text-blue-500" href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
