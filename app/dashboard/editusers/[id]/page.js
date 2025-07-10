"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://crud.parxfit.com/api";

export default function EditUserPage() {
  const router = useRouter();
  const { id } = useParams();

  const [user, setUser] = useState({
    f_name: "",
    l_name: "",
    email: "",
    mobile: "",
    role_id: "",
    country_id: "",
    state_id: "",
    city_id: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch User Data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`);
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        setUser(data.user || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchUser();
  }, [id]);

  // Fetch Countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/master/data-filter`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ table_name: "countries" }),
        });
        const data = await response.json();
        if (data?.success) setCountries(data.data);
      } catch (error) {
        setError("Failed to fetch countries");
      }
    };
    fetchCountries();
  }, []);

  // Fetch States when country changes
  useEffect(() => {
    if (!user.country_id) return;
    setStates([]);
    setCities([]);
    const fetchStates = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/master/data-filter`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ table_name: "states", filter: { country_id: user.country_id } }),
        });
        const data = await response.json();
        if (data?.success) setStates(data.data);
      } catch (error) {
        setError("Failed to fetch states");
      }
    };
    fetchStates();
  }, [user.country_id]);

  // Fetch Cities when state changes
  useEffect(() => {
    if (!user.state_id) return;
    setCities([]);
    const fetchCities = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/master/data-filter`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ table_name: "cities", filter: { state_id: user.state_id } }),
        });
        const data = await response.json();
        if (data?.success) setCities(data.data);
      } catch (error) {
        setError("Failed to fetch cities");
      }
    };
    fetchCities();
  }, [user.state_id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error("Failed to update user");
      alert("User updated successfully!");
      router.replace("/dashboard/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="f_name" value={user.f_name} onChange={handleChange} placeholder="First Name" className="border p-2" />
        <input name="l_name" value={user.l_name} onChange={handleChange} placeholder="Last Name" className="border p-2" />
        <input name="email" value={user.email} onChange={handleChange} placeholder="Email" className="border p-2" />
        <input name="mobile" value={user.mobile} onChange={handleChange} placeholder="Mobile" className="border p-2" />
        
        <select name="role_id" value={user.role_id} onChange={handleChange} className="border p-2 rounded-md">
          <option value="">Select a role</option>
          <option value="1">Super Admin</option>
          <option value="2">Admin</option>
          <option value="3">Employee</option>
        </select>

        <select name="country_id" value={user.country_id} onChange={handleChange} className="border p-2 rounded-md">
          <option value="">Select a country</option>
          {countries.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select name="state_id" value={user.state_id} onChange={handleChange} className="border p-2 rounded-md">
          <option value="">Select a state</option>
          {states.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>

        <select name="city_id" value={user.city_id} onChange={handleChange} className="border p-2 rounded-md">
          <option value="">Select a city</option>
          {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update Employee</button>
      </form>
    </div>
  );
}
