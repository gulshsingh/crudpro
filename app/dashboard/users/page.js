"use client";

import React, { useState, useEffect } from "react";

export default function CarsPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const carList = [
      {
        id: 1,
        name: "Dubai Baleno",
        brand: "Maruti",
        image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
        price_per_day: 1800,
        km_per_hour: 90,
        location: { city: "Dubai Derum", state: "Dubai" },
      },
      {
        id: 2,
        name: "Dubai Swift Dzire",
        brand: "Maruti",
        image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
        price_per_day: 1600,
        km_per_hour: 85,
        location: { city: "Dubai Derum", state: "Dubai" },
      },
      {
        id: 3,
        name: "Dubai Creta",
        brand: "Hyundai",
        image: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg",
        price_per_day: 2500,
        km_per_hour: 100,
        location: { city: "Dubai Derum", state: "Dubai" },
      },
      {
        id: 4,
        name: "Dubai Verna",
        brand: "Hyundai",
        image: "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg",
        price_per_day: 2300,
        km_per_hour: 95,
        location: { city: "Dubai Derum", state: "Dubai" },
      },
      {
        id: 5,
        name: "Dubai Innova",
        brand: "Toyota",
        image: "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg",
        price_per_day: 2800,
        km_per_hour: 110,
        location: { city: "Dubai Derum", state: "Dubai" },
      },
      {
        id: 6,
        name: "Dubai Fortuner",
        brand: "Toyota",
        image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
        price_per_day: 3500,
        km_per_hour: 120,
        location: { city: "Dubai Derum", state: "Dubai" },
      },
      {
        id: 7,
        name: "Dubai XUV700",
        brand: "Mahindra",
        image: "https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg",
        price_per_day: 3200,
        km_per_hour: 115,
        location: { city: "Dubai Derum", state: "Dubai" },
      },
      {
        id: 8,
        name: "Dubai Thar",
        brand: "Mahindra",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40087/thar-exterior-right-front-three-quarter-32.jpeg?q=80",
        price_per_day: 2800,
        km_per_hour: 90,
        location: { city: "Dubai Derum", state: "Dubai" },
      },
      {
        id: 9,
        name: "Dubai City",
        brand: "Honda",
        image: "https://www.dadamotors.com/all/superadmin/carimage2/mahindra-thar-2.webp",
        price_per_day: 2200,
        km_per_hour: 95,
        location: { city: "Dubai Derum", state: "Dubai" },
      },
      {
        id: 10,
        name: "Dubai Civic",
        brand: "Honda",
        image: "https://static.toiimg.com/photo/80387978.cms",
        price_per_day: 2400,
        km_per_hour: 100,
        location: { city: "Dubai Derum", state: "Dubai" },
      },
      {
        id: 11,
        name: "Dubai Seltos",
        brand: "Kia",
        image: "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg",
        price_per_day: 2600,
        km_per_hour: 105,
        location: { city: "Dubai Derum", state: "Dubai" },
      },
      {
        id: 12,
        name: "Dubai Sonet",
        brand: "Kia",
        image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
        price_per_day: 2400,
        km_per_hour: 95,
        location: { city: "Dubai Derum", state: "Dubai" },
      },
    ];

    setCars(carList);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Available Cars in Dubai</h1>
      <p className="text-gray-700 mb-6">All rentals available in Dubai Derum.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            {car.image && (
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
            )}
            <h2 className="text-lg font-semibold text-gray-800">
              {car.brand} {car.name}
            </h2>
            <p className="text-gray-700 mt-1">💰 ₹{car.price_per_day} / day</p>
            <p className="text-gray-700">🛣️ {car.km_per_hour} km/h</p>
            <p className="text-gray-600">📍 {car.location.city}, {car.location.state}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
