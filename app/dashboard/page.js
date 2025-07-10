"use client";

import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function DashboardPage() {
  const summaryCards = [
    { label: "Total Customers", value: "1,245", growth: "+8%", color: "text-blue-600" },
    { label: "Revenue This Month", value: "$78,340", growth: "+10%", color: "text-green-600" },
    { label: "Active Bookings", value: "920", growth: "+5%", color: "text-purple-600" },
    { label: "Available Vehicles", value: "36", growth: "-2%", color: "text-red-600" },
  ];

  const recentRentals = [
    { id: "RNT-001", customer: "Aman Singh", amount: "$120", status: "Completed" },
    { id: "RNT-002", customer: "Divya Patel", amount: "$200", status: "Pending" },
    { id: "RNT-003", customer: "Karan Mehta", amount: "$75", status: "Cancelled" },
    { id: "RNT-004", customer: "Sneha Iyer", amount: "$150", status: "Completed" },
  ];

  const bookingStats = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Bookings",
        data: [10, 14, 20, 18, 25, 35, 30],
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6 bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-gray-900">Car Rental Dashboard</h1>
        <p className="text-gray-600 mt-1">Daily overview of your business activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {summaryCards.map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-md">
            <h3 className="text-gray-700 text-sm">{item.label}</h3>
            <p className="text-xl font-bold">{item.value}</p>
            <span className={`text-sm ${item.color}`}>{item.growth}</span>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Recent Rentals
          </h2>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-2 px-3">Rental ID</th>
              <th className="py-2 px-3">Customer</th>
              <th className="py-2 px-3">Amount

              </th>
              <th className="py-2 px-3">Status

              </th>
            </tr>
          </thead>
          <tbody>
            {recentRentals.map((rental) => (
              <tr key={rental.id} className="border-t">
                <td className="py-2 px-3">{rental.id}

                </td>
                
                <td className="py-2 px-3">{rental.customer}

                </td>

                <td className="py-2 px-3">{rental.amount}

                </td>
                <td
                  className={`py-2 px-3 ${
                    rental.status === "Completed"
                      ? "text-green-600"


                      : rental.status === "Pending"
                      ?
                      
                      "text-yellow-600"
                     
                     
                     
                      : "text-red-600"
                  }
                  `}
                >
                  {rental.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Weekly Bookings
          </h2>
        <Bar data={bookingStats} />
      </div>
    </div>
  );
}
