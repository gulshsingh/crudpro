"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const mockCars = [
  {
    id: 1,
    name: "Baleno",
    brand: "Maruti",
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    price_per_day: 1800,
    status: "pending",
  },
  {
    id: 2,
    name: "i20",
    brand: "Hyundai",
    image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
    price_per_day: 2000,
    status: "approved",
  },
];

export default function AdminCarListPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    setCars(mockCars); // Replace with API call
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = cars.map((car) =>
      car.id === id ? { ...car, status: newStatus } : car
    );
    setCars(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Car Rental Listings</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <div key={car.id} className="border p-4 rounded-xl shadow bg-white">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <div className="font-bold text-lg">{car.brand} {car.name}</div>
            <div className="text-gray-600">₹{car.price_per_day} / day</div>

            <div className="mt-3 flex justify-between items-center">
              <select
                className="border p-1 rounded text-sm"
                value={car.status}
                onChange={(e) => handleStatusChange(car.id, e.target.value)}
              >
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
              </select>

              <Link
                href={`/dashboard/admin/edit/${car.id}`}
                className="text-sm text-blue-600 underline"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
