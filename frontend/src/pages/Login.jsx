import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/login", form);
      login(data);
      navigate("/");
    } catch (err) {
      alert("Invalid login");
    }
  };

 return (
  <div className="container">
    <form onSubmit={handleSubmit} className="card">
      <h2>Login</h2>

      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />

      <button>Login</button>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </form>
  </div>
);
}