import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/register", form);
      login(data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
      <button>Register</button>
      <p>Already have an account? <a href="/login">Login</a></p>
    </form>
  );
}