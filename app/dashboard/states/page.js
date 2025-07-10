"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const StateTable = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editStateName, setEditStateName] = useState("");
  const [editStateNote, setEditStateNote] = useState("");
  const [editCountryId, setEditCountryId] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
    fetchStates();
  }, []);

  // Fetch Countries
  const fetchCountries = async () => {
    try {
      const response = await fetch("http://crud.parxfit.com/api/master/data-filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table_name: "countries" }),
      });

      if (!response.ok) throw new Error("Failed to fetch countries");

      const data = await response.json();
      if (Array.isArray(data.data)) setCountries(data.data);
    } catch (err) {
      console.error("Error fetching countries:", err);
    }
  };

  // Fetch States
  const fetchStates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://crud.parxfit.com/api/master/data-filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table_name: "states" }),
      });

      if (!response.ok) throw new Error(`Failed to fetch states: ${response.status}`);

      const data = await response.json();
      if (Array.isArray(data.data)) setStates(data.data);
      else throw new Error("Invalid response structure");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
 

  // Delete a state
  const deleteState = async (id) => {
    if (!confirm("Are you sure you want to delete this state?")) return;
    setLoading(true);
    try {
      const response = await fetch(`https://crud.parxfit.com/api/master/destroy/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table_name: "states" }),
      });

      if (!response.ok) throw new Error(`Failed to delete state: ${response.status}`);

      alert("State deleted successfully!");
      fetchStates();
    } catch (error) {
      alert("Failed to delete state: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Add State Button */}
      <div className="mr-0 w-full flex justify-end">
        <Link href="/dashboard/states/AddstatesForm">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
            ➕ Add State
          </button>
        </Link>
      </div>

      {/* State Table */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">State List</h2>

        {loading ? (
          <p>Loading states...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">State Name</th>
                <th className="border p-2">State Note</th>
                <th className="border p-2">Country</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {states.map((state) => (
                <tr key={state.id} className="hover:bg-gray-100">
                  <td className="border p-2 text-center">{state.id}</td>

                  {/* Editable Fields */}
                  <td className="border p-2">
                    {editId === state.id ? (
                      <input
                        type="text"
                        value={editStateName}
                        onChange={(e) => setEditStateName(e.target.value)}
                        className="border p-1 w-full"
                      />
                    ) : (
                      state.name
                    )}
                  </td>

                  <td className="border p-2">
                    {editId === state.id ? (
                      <input
                        type="text"
                        value={editStateNote}
                        onChange={(e) => setEditStateNote(e.target.value)}
                        className="border p-1 w-full"
                      />
                    ) : (
                      state.note || "N/A"
                    )}
                  </td>

                  <td className="border p-2">
                    {editId === state.id ? (
                      <select
                        value={editCountryId}
                        onChange={(e) => setEditCountryId(e.target.value)}
                        className="border p-1 w-full"
                      >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      countries.find((c) => c.id === state.country_id)?.name || "N/A"
                    )}
                  </td>

                  <td className="border p-2 text-center">
                    
                      <>
                      <Link href={`/dashboard/states/edit/${state.id}`}>
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2">
                        Edit
                      </button>
                    </Link>
                        <button onClick={() => deleteState(state.id)} className="bg-red-500 text-white px-3 py-1 rounded-md">
                          Delete
                        </button>
                      </>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StateTable;
