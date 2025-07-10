"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CitiesTable = () => {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const router = useRouter();

  // Fetch Countries
  const fetchCountries = async () => {
    try {
      setError(null);
      const response = await fetch("https://crud.parxfit.com/api/master/data-filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table_name: "countries" }),
      });

      if (!response.ok) throw new Error("Failed to fetch countries");

      const data = await response.json();
      if (Array.isArray(data.data)) setCountries(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch States
  const fetchStates = async () => {
    try {
      setError(null);
      const response = await fetch("https://crud.parxfit.com/api/master/data-filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table_name: "states" }),
      });

      if (!response.ok) throw new Error("Failed to fetch states");

      const data = await response.json();
      if (Array.isArray(data.data)) setStates(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch Cities
  const fetchCities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://crud.parxfit.com/api/master/data-filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table_name: "cities" }),
      });

      if (!response.ok) throw new Error("Failed to fetch cities");

      const data = await response.json();
      setCities(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async (cityId) => {
    if (!window.confirm("Are you sure you want to delete this city?")) return;

    setDeletingId(cityId);
    try {
      const response = await fetch(`https://crud.parxfit.com/api/master/destroy/${cityId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table_name: "cities" }),
      });

      if (!response.ok) throw new Error("Failed to delete city");

      alert("City deleted successfully!");
      fetchCities(); // Refresh list
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchCountries();
    fetchStates();
    fetchCities();
  }, []);

  return (
    <div className="p-6">
      {/* Add City Button */}
      <div className="flex justify-between mb-4">
        <Link href="/dashboard/cities/AddcitiesForm">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
            ➕ Add City
          </button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">Cities List</h1>

      {/* Loading and Error Messages */}
      {loading && <p className="text-gray-500">Loading cities...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Cities Table */}
      {!loading && !error && cities.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Country</th>
                <th className="border border-gray-300 px-4 py-2">State</th>
                <th className="border border-gray-300 px-4 py-2">City Name</th>
                <th className="border border-gray-300 px-4 py-2">City Note</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city) => {
                const state = states.find((s) => Number(s.id) === Number(city.state_id));
                const country = countries.find((c) => Number(c.id) === Number(state?.country_id));
                return (
                  <tr key={city.id} className="text-gray-700">
                    <td className="border border-gray-300 px-4 py-2 text-center">{city?.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{country ? country.name : "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{state ? state.name : "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{city.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{city.note || "No note"}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center flex gap-2">
                      {/* Edit Button */}
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-blue-600"
                        onClick={() => router.push(`/dashboard/cities/edit/${city.id}`)}
                      >
                        Edit
                      </button>
                      {/* Delete Button */}
                      <button
                        className={`px-3 py-1 rounded-md shadow-md ${
                          deletingId === city.id ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                        } text-white`}
                        onClick={() => handleDelete(city.id)}
                        disabled={deletingId === city.id}
                      >
                        {deletingId === city.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* No Cities Found Message */}
      {!loading && !error && cities.length === 0 && <p className="text-gray-600">No cities found.</p>}
    </div>
  );
};

export default CitiesTable;
