"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Import router

const AddCitiesForm = ({ fetchCities }) => {
  const [cityName, setCityName] = useState("");
  const [cityNote, setCityNote] = useState("");
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
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

  // Fetch States Based on Selected Country
  useEffect(() => {
    if (!countryId) return;

    const fetchStates = async () => {
      try {
        const response = await fetch("http://crud.parxfit.com/api/master/data-filter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ table_name: "states", country_id: countryId }),
        });

        if (!response.ok) throw new Error(`Failed to fetch states: ${response.status}`);

        const data = await response.json();
        if (Array.isArray(data.data)) setStates(data.data);
        else throw new Error("Invalid response structure");
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStates();
  }, [countryId]);

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
          table_name: "cities",
          name: cityName,
          note: cityNote,
          state_id: stateId,
        }),
      });

      if (!response.ok) throw new Error(`Failed to add city: ${response.status}`);

      alert("City added successfully! ✅");
      setCityName("");
      setCityNote("");
      setStateId("");
      setCountryId("");

      if (fetchCities) fetchCities(); // Refresh city list if function exists

      // ✅ Redirect to Cities List Page
      router.push("/dashboard/cities");
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      {/* Add City Form */}
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Add City</h1>

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

          {/* State Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select State:</label>
            <select
              value={stateId}
              onChange={(e) => setStateId(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              disabled={!countryId} // Disable state selection until a country is selected
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {/* City Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">City Name:</label>
            <input
              type="text"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* City Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700">City Note:</label>
            <textarea
              value={cityNote}
              onChange={(e) => setCityNote(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-fit flex justify-center items-center bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "➕ Add City"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCitiesForm;
