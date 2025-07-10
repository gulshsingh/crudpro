"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter

const AddCountryForm = ({ fetchCountries }) => {
  const [countryName, setCountryName] = useState("");
  const [countryNote, setCountryNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter(); // ✅ Initialize useRouter

  // Add a new country
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload = { table_name: "countries", name: countryName, note: countryNote };

    try {
      const response = await fetch("http://crud.parxfit.com/api/master", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to add country: ${response.status}`);
      }

      // Reset form fields
      setCountryName("");
      setCountryNote("");

      // Refresh country list
      if (fetchCountries) fetchCountries();
      alert("Country added successfully!");
 // ✅ Redirect to Country List page
 router.push("/dashboard/country");
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      {/* Add Country Form */}
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Add Country</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Country Name:</label>
            <input
              type="text"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Country Note:</label>
            <textarea
              value={countryNote}
              onChange={(e) => setCountryNote(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Country"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCountryForm;
