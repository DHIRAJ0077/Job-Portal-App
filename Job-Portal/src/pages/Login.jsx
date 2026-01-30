import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:5000/api/auth/login", form);

    login(res.data.user, res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full mb-4 px-4 py-3 border rounded-lg" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full mb-4 px-4 py-3 border rounded-lg" />

        <button className="w-full bg-[#13823a] text-white py-3 rounded-lg">
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account? <Link to="/register" className="text-green-600">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
