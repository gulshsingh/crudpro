"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Import router

const AddStateForm = ({ fetchStates }) => {
  const [stateName, setStateName] = useState("");
  const [stateNote, setStateNote] = useState("");
  const [countryId, setCountryId] = useState("");
  const [countries, setCountries] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter(); // ✅ Initialize router

  // Fetch Countries for Dropdown
  useEffect(() => {
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

    fetchCountries();
  }, []);

  // Handle Form Submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("http://crud.parxfit.com/api/master", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table_name: "states",
          name: stateName,
          note: stateNote,
          country_id: countryId,
        }),
      });

      if (!response.ok) throw new Error(`Failed to add state: ${response.status}`);

      alert("State added successfully! ✅");
      setStateName("");
      setStateNote("");
      setCountryId("");

      if (fetchStates) fetchStates(); // Refresh state list if function exists

      // ✅ Redirect to States List Page
      router.push("/dashboard/states");
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      {/* Add State Form */}
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mb-6">

        <h1 className="text-2xl font-bold mb-4">Add State</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">


{/* Country Dropdown */}
<div>
            <label className="block text-sm font-medium text-gray-700">Select Country:</label>
            <select
              value={countryId}
              onChange={(e) => setCountryId(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">State Name:</label>
            <input
              type="text"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">State Note:</label>
            <textarea
              value={stateNote}
              onChange={(e) => setStateNote(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          

          <button
  type="submit"
  className="w-fit flex justify-center items-center bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 gap-2"
  disabled={isSubmitting}
>
  {isSubmitting ? "Adding..." : "➕ Add State"}
</button>

        </form>
      </div>
    </div>
  );
};

export default AddStateForm;
