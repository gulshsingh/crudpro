"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Simulate logout and redirect
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900">Logging out...</h1>
      <p className="text-gray-700">You will be redirected shortly.</p>
    </div>
  );
}
