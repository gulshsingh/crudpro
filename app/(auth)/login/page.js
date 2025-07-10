"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.email === formData.password) {
      setError("Email and password cannot be the same. Please enter valid credentials.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://crud.parxfit.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed. Please check your credentials.");
      }

      // Store token if provided (assuming backend returns a token)
      if (result.token) {
         localStorage.setItem("token", result.token);
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="mb-2 text-4xl font-extrabold text-gray-900">Log in</h1>
          <p className="text-xs text-gray-600">Before we start, please log into your account</p>
        </div>

        <form onSubmit={handleSubmit} className="my-8 flex flex-col gap-4">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email..."
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-500 outline-none bg-white"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password..."
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-500 outline-none bg-white"
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="h-4 w-4 text-purple-500 rounded" />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">Remember me</label>
            </div>
            <p className="cursor-pointer text-sm text-purple-500 hover:underline">Forgot password?</p>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 text-white font-bold rounded-md shadow-md transition-all ${
              loading ? "bg-gray-400" : "bg-purple-500 hover:bg-purple-600"
            }`}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-3 gap-4">
          <hr className="w-full border-gray-300" />
          <p className="text-sm text-gray-500">OR</p>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Google Login Button */}
        <button className="flex w-full items-center justify-center gap-3 border border-gray-300 p-3 rounded-md text-gray-700 hover:bg-gray-100 transition bg-white">
          <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google" className="w-5 h-5" />
          Login with Google
        </button>

        {/* GitHub Login Button */}
        <button className="flex w-full items-center justify-center gap-3 border mt-2 border-gray-300 p-3 rounded-md text-gray-700 hover:bg-gray-100 transition bg-white">
          <img src="https://www.svgrepo.com/show/312259/github.svg" alt="GitHub" className="w-5 h-5" />
          Login with GitHub
        </button>

        {/* Sign Up Link */}
        <p className="text-sm text-center text-gray-700 mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="cursor-pointer font-bold text-purple-500 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
