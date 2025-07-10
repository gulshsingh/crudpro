"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Dummy user profile images based on ID (simulate assigned staff)
const humanImages = {
  1: "https://randomuser.me/api/portraits/men/32.jpg",
  2: "https://randomuser.me/api/portraits/women/44.jpg",
};

export default function EditCarPage() {
  const { id } = useParams();
  const router = useRouter();
  const [car, setCar] = useState(null);

  useEffect(() => {
    // Simulate fetch from API
    const carData = {
      1: {
        id: 1,
        name: "Baleno",
        brand: "Maruti",
        image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
        price_per_day: 1800,
        status: "pending",
      },
      2: {
        id: 2,
        name: "i20",
        brand: "Hyundai",
        image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
        price_per_day: 2000,
        status: "approved",
      },
    };

    setCar(carData[id]);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit to backend
    alert("Car updated!");
    router.push("/dashboard/admin");
  };

  if (!car) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Edit Car: {car.name}
      </h1>

      <div className="flex gap-6 items-start mb-6">
        {/* Car Image Preview */}
        <div className="w-1/2">
          <img
            src={car.image}
            alt={car.name}
            className="rounded-lg w-full h-48 object-cover border"
          />
          <p className="text-sm text-gray-500 mt-2 text-center">Car Image Preview</p>
        </div>

        {/* Assigned Human Image (Owner/Staff) */}
        <div className="w-1/2 text-center">
          <img
            src={humanImages[car.id]}
            alt="Manager"
            className="w-24 h-24 rounded-full mx-auto border"
          />
          <p className="text-sm mt-2 text-gray-600">Assigned Manager</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Car Name</label>
          <input
            type="text"
            defaultValue={car.name}
            className="w-full border p-2 rounded"
            placeholder="Car Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Brand</label>
          <input
            type="text"
            defaultValue={car.brand}
            className="w-full border p-2 rounded"
            placeholder="Brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price per Day (₹)</label>
          <input
            type="number"
            defaultValue={car.price_per_day}
            className="w-full border p-2 rounded"
            placeholder="Price"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="url"
            defaultValue={car.image}
            className="w-full border p-2 rounded"
            placeholder="Image URL"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            defaultValue={car.status}
            className="w-full border p-2 rounded"
          >
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="col-span-2 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
