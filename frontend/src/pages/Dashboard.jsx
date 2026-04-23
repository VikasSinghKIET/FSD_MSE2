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
  <div className="dashboard">

    {/* Navbar */}
    <div className="navbar">
      <h2>Dashboard</h2>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>

    {/* Form */}
    <div className="form-box">
      <h3>Submit Grievance</h3>
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
    </div>

    {/* Search */}
    <div className="search-box">
      <input placeholder="Search grievance..." onChange={e => setSearch(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>

    {/* List */}
    {grievances.map(g => (
      <div key={g._id} className="grievance-card">
        <h3>{g.title}</h3>
        <p>{g.description}</p>
        <p>{g.category}</p>

        <p className={`status ${g.status.toLowerCase()}`}>
          {g.status}
        </p>

        <button className="delete-btn" onClick={() => handleDelete(g._id)}>
          Delete
        </button>
      </div>
    ))}
  </div>
);
}