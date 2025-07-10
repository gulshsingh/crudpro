"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const EditCityPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [city, setCity] = useState({ name: "", note: "", state_id: "", country_id: "" });
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch City Details
  useEffect(() => {
    if (!id) return;

    const fetchCity = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://crud.parxfit.com/api/master/show/${id}?table_name=cities`);
        if (!response.ok) throw new Error("Failed to fetch city");
        const data = await response.json();
        if (!data.data) throw new Error("City not found");

        setCity({
          name: data.data.name || "",
          note: data.data.note || "",
          state_id: data.data.state_id || "",
        //   country_id: data.data.country_id || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
  }, [id]);

  // Fetch States and Countries
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("https://crud.parxfit.com/api/master/data-filter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ table_name: "states" }),
        });
        if (!response.ok) throw new Error("Failed to fetch states");
        const data = await response.json();
        setStates(data.data || []);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchCountries = async () => {
      try {
        const response = await fetch("https://crud.parxfit.com/api/master/data-filter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ table_name: "countries" }),
        });
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();
        setCountries(data.data || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStates();
    fetchCountries();
  }, []);

  // Handle Update
  const updateCity = async () => {
    if (!city.name.trim() || !city.state_id ) {
      setError("All fields are required");
      return;
    }

    setIsUpdating(true);
    setError(null);

    try {
      const response = await fetch(`https://crud.parxfit.com/api/master/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table_name: "cities",
          name: city.name.trim(),
          note: city.note.trim(),
          state_id: city.state_id,
       
        }),
      });

      if (!response.ok) throw new Error("Failed to update city");
      alert("City updated successfully!");
      router.push("/dashboard/cities");
    } catch (err) {
      setError(err.message || "Failed to update city");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit City (ID: {id})</h2>

      {loading ? (
        <p>Loading city data...</p>
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-md">Error: {error}</div>
      ) : (
        <div className="space-y-4 max-w-lg">
          <div>
            <label className="block font-semibold mb-2">City Name *</label>
            <input
              type="text"
              value={city.name}
              onChange={(e) => setCity({ ...city, name: e.target.value })}
              className="border p-2 w-full rounded-md"
              disabled={isUpdating}
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">City Note</label>
            <input
              type="text"
              value={city.note}
              onChange={(e) => setCity({ ...city, note: e.target.value })}
              className="border p-2 w-full rounded-md"
              disabled={isUpdating}
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">State *</label>
            <select
              value={city.state_id}
              onChange={(e) => setCity({ ...city, state_id: e.target.value })}
              className="border p-2 w-full rounded-md"
              disabled={isUpdating}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>{state.name}</option>
              ))}
            </select>
          </div>

          {/* <div>
            <label className="block font-semibold mb-2">Country *</label>
            <select
              value={city.country_id}
              onChange={(e) => setCity({ ...city, country_id: e.target.value })}
              className="border p-2 w-full rounded-md"
              disabled={isUpdating}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>{country.name}</option>
              ))}
            </select>
          </div> */}

          <div className="flex gap-4">
            <button
              onClick={updateCity}
              disabled={isUpdating || loading}
              className={`px-4 py-2 rounded-md text-white ${isUpdating ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
            >
              {isUpdating ? "Updating..." : "Update City"}
            </button>
            <button onClick={() => router.push("/dashboard/cities")} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCityPage;
