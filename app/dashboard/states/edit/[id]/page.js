"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const EditStatePage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [state, setState] = useState({ name: "", note: "", country_id: "" });
  const [countries, setCountries] = useState([]); // 🔹 Store available countries
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch state details
  useEffect(() => {
    if (!id) return;

    const fetchState = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(`Fetching state data for ID: ${id}...`);

        const response = await fetch(`https://crud.parxfit.com/api/master/show/${id}?table_name=states`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch state: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched State Data:", data);

        if (!data.data || typeof data.data !== "object") {
          throw new Error("State data not found or invalid response format");
        }

        setState({
          name: data.data.name || "",
          note: data.data.note || "",
          country_id: data.data.country_id || "",
        });

      } catch (error) {
        console.error("Error fetching state:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchState();
  }, [id]);

  // Fetch countries for dropdown
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://crud.parxfit.com/api/master/index?table_name=countries");
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data = await response.json();
        console.log("Fetched Countries:", data);

        if (!Array.isArray(data.data)) {
          throw new Error("Invalid country data format");
        }

        setCountries(data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Handle Update
  const updateState = async () => {
    if (!state.name.trim() || !state.country_id.trim()) {
      setError("State name and Country ID are required");
      return;
    }

    setIsUpdating(true);
    setError(null);

    try {
      const response = await fetch(`https://crud.parxfit.com/api/master/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table_name: "states",
          name: state.name.trim(),
          note: state.note.trim(),
          country_id: state.country_id.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      alert("State updated successfully!");
      router.push("/dashboard/states");
    } catch (error) {
      setError(error.message || "Failed to update state");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit State (ID: {id})</h2>

      {loading ? (
        <p>Loading state data...</p>
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-md">
          Error: {error}
        </div>
      ) : (
        <div className="space-y-4 max-w-lg">
          <div>
            <label className="block font-semibold mb-2">State Name *</label>
            <input
              type="text"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
              className="border p-2 w-full rounded-md"
              disabled={isUpdating}
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">State Note</label>
            <input
              type="text"
              value={state.note}
              onChange={(e) => setState({ ...state, note: e.target.value })}
              className="border p-2 w-full rounded-md"
              disabled={isUpdating}
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Country *</label>
            <select
              value={state.country_id}
              onChange={(e) => setState({ ...state, country_id: e.target.value })}
              className="border p-2 w-full rounded-md"
              disabled={isUpdating}
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex gap-4">
            <button
              onClick={updateState}
              disabled={isUpdating || loading}
              className={`px-4 py-2 rounded-md text-white ${
                isUpdating ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isUpdating ? "Updating..." : "Update State"}
            </button>

            <button
              onClick={() => router.push("/dashboard/states")}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditStatePage;
