import { useState, useEffect, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [grievances, setGrievances] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Academic"
  });
  const [search, setSearch] = useState("");

  const fetchGrievances = async () => {
    const { data } = await API.get("/grievances");
    setGrievances(data);
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/grievances", form);
    fetchGrievances();
  };

  const handleDelete = async (id) => {
    await API.delete(`/grievances/${id}`);
    fetchGrievances();
  };

  const handleSearch = async () => {
    const { data } = await API.get(`/grievances/search?title=${search}`);
    setGrievances(data);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>

      {/* Submit Form */}
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" onChange={e => setForm({...form, title: e.target.value})} />
        <input placeholder="Description" onChange={e => setForm({...form, description: e.target.value})} />
        <select onChange={e => setForm({...form, category: e.target.value})}>
          <option>Academic</option>
          <option>Hostel</option>
          <option>Transport</option>
          <option>Other</option>
        </select>
        <button>Submit</button>
      </form>

      {/* Search */}
      <input placeholder="Search..." onChange={e => setSearch(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {/* List */}
      <ul>
        {grievances.map(g => (
          <li key={g._id}>
            <h4>{g.title}</h4>
            <p>{g.description}</p>
            <p>{g.category}</p>
            <p>Status: {g.status}</p>
            <button onClick={() => handleDelete(g._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}