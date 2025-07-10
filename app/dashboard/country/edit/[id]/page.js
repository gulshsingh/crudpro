"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const EditCountryPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [country, setCountry] = useState({ name: "", note: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch country details
  useEffect(() => {
    if (!id) return;

    const fetchCountry = async () => {
        if (!id) return; // Ensure id is available before making the request
      
        setLoading(true);
        setError(null);
      
        try {
          console.log(`Fetching country data for ID: ${id}...`);
      
          const response = await fetch(`https://crud.parxfit.com/api/master/show/${id}?table_name=countries`, {
            method: "GET", // ✅ Use GET for fetching data
            headers: { "Content-Type": "application/json" }, // May not be required for GET, but safe
          });
      
          if (!response.ok) {
            throw new Error(`Failed to fetch country: ${response.status} ${response.statusText}`);
          }
      
          const data = await response.json();
          console.log("Fetched Data:", data);
      
          if (!data.data || typeof data.data !== "object") {
            throw new Error("Country data not found or invalid response format");
          }
      
          // ✅ Ensure data structure before setting state
          setCountry({
            name: data.data.name || "N/A",
            note: data.data.note || "No note available",
          });
      
        } catch (error) {
          console.error("Error fetching country:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      
      
    fetchCountry();
  }, [id]);

  // Handle Update
  const updateCountry = async () => {
    if (!country.name.trim()) {
      setError("Country name is required");
      return;
    }

    setIsUpdating(true);
    setError(null);

    try {
      const response = await fetch(`https://crud.parxfit.com/api/master/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table_name: "countries",
          name: country.name.trim(),
          note: country.note.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      alert("Country updated successfully!");
      router.push("/dashboard/country");
    } catch (error) {
      setError(error.message || "Failed to update country");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Country (ID: {id})</h2>

      {loading ? (
        <p>Loading country data...</p>
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-md">
          Error: {error}
        </div>
      ) : (
        <div className="space-y-4 max-w-lg">
          <div>
            <label className="block font-semibold mb-2">Country Name *</label>
            <input
              type="text"
              value={country.name}
              onChange={(e) => setCountry({ ...country, name: e.target.value })}
              className="border p-2 w-full rounded-md"
              disabled={isUpdating}
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Country Note</label>
            <input
              type="text"
              value={country.note}
              onChange={(e) => setCountry({ ...country, note: e.target.value })}
              className="border p-2 w-full rounded-md"
              disabled={isUpdating}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex gap-4">
            <button
              onClick={updateCountry}
              disabled={isUpdating || loading}
              className={`px-4 py-2 rounded-md text-white ${
                isUpdating ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isUpdating ? "Updating..." : "Update Country"}
            </button>

            <button
              onClick={() => router.push("/dashboard/country")}
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

export default EditCountryPage;