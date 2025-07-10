"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";

const CountryTable = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch countries
  const fetchCountries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://crud.parxfit.com/api/master/data-filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table_name: "countries" }),
      });

      if (!response.ok) throw new Error(`Failed to fetch countries: ${response.status}`);

      const data = await response.json();
      if (Array.isArray(data.data)) {
        setCountries(data.data);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Handle Delete
  const deleteCountry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this country?")) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`https://crud.parxfit.com/api/master/destroy/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table_name: "countries" }),
      });

      if (!response.ok) throw new Error(`Failed to delete country: ${response.status}`);

      setCountries(countries.filter((country) => country.id !== id));
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete country");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-6">
      {/* Add Button */}
      <div className="mr-0 w-full flex justify-end">
        <Link href="country/AddCountryForm">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
            Add
          </button>
        </Link>
      </div>

      {/* Country List Table */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Country List</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {loading ? (
          <p>Loading countries...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Country Name</th>
                <th className="border p-2">Country Note</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {countries.map((country) => (
                <tr key={country.id} className="hover:bg-gray-100">
                  <td className="border p-2 text-center">{country.id}</td>
                  <td className="border p-2">{country.name}</td>
                  <td className="border p-2">{country.note || "N/A"}</td>
                  <td className="border p-2 text-center">
                    <div className="flex gap-2">
                      {/* Edit Button - Redirects to /country/edit/[id] */}
                      {country.id ? (
  <Link href={`country/edit/${country.id}`}>
    <button className="bg-yellow-500 text-white px-3 py-1 rounded-md">
      <Edit />
    </button>
  </Link>
) : (
  <p className="text-red-500">ID Not Found</p>
)}


                      {/* Delete Button */}
                      <button
                        onClick={() => deleteCountry(country.id)}
                        disabled={isDeleting}
                        className={`px-3 py-1 rounded-md ${isDeleting ? "bg-gray-500" : "bg-red-500"} text-white`}
                      >
                        {isDeleting ? "Deleting..." : <Trash2 />}
                      </button>
                    </div>
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

export default CountryTable;
