
"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);


  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);


  const [authState, setAuthState] = useState({
    f_name: "",
    l_name: "",
    email: "",
    mobile: "",
    role_id: "",
    country_id: "",
    state_id: "",
    city_id:"",
    password: "",
    password_confirmation: "",
    termsAccepted: false,
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("http://crud.parxfit.com/api/master/data-filter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ table_name: "countries" }),
        });

        const data = await response.json();
        if (data?.success && Array.isArray(data.data)) {
          setCountries(data.data);
        } else {
          console.error("API error: Invalid response structure", data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!authState.country_id) {
      setStates([]);
      return;
    }

    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const response = await fetch("http://crud.parxfit.com/api/master/data-filter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table_name: "states",
            filters: { country_id: authState.country_id },
          }),
        });

        const data = await response.json();
        if (data?.success && Array.isArray(data.data)) {
          setStates(data.data);
        } else {
          console.error("API error: Invalid response structure", data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, [authState.country_id]);
  useEffect(() => {
    if (!authState.state_id) {
      setCities([]);
      return;
    }
  
    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const response = await fetch("http://crud.parxfit.com/api/master/data-filter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table_name: "cities",
            filters: { state_id: authState.state_id },
          }),
        });
  
        const data = await response.json();
        if (data?.success && Array.isArray(data.data)) {
          setCities(data.data);
        } else {
          console.error("API error: Invalid response structure", data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoadingCities(false);
      }
    };
  
    fetchCities();
  }, [authState.state_id]);
  

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setAuthState((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const addUser = async () => {
    setLoading(true);
    try {
      let response = await fetch("https://crud.parxfit.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authState),
      });

      let result = await response.json();
      
      if (result?.success) {
        router.push(result.role?.id === 1 ? "/dashboard/admin" : "/dashboard");
      } else {
        alert(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    
    if (!authState.termsAccepted) {
      alert("You must accept the terms and conditions.");
      return;
    }

    if (authState.password !== authState.password_confirmation) {
      alert("Passwords do not match.");
      return;
    }

    if (Object.entries(authState).some(([key, value]) => value === "" && key !== "termsAccepted")) {
      alert("All fields are required.");
      return;
    }

    addUser();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center mb-2">Register</h1>
        <p className="text-xs text-gray-600 text-center">Create your account</p>

        <form onSubmit={submitForm} className="my-8 flex flex-col gap-4">
          <input id="f_name" required placeholder="First Name" value={authState.f_name} onChange={handleInputChange} className="w-full border p-3 rounded-md" />
          <input id="l_name" required placeholder="Last Name" value={authState.l_name} onChange={handleInputChange} className="w-full border p-3 rounded-md" />
          <input id="email" required type="email" placeholder="Email" value={authState.email} onChange={handleInputChange} className="w-full border p-3 rounded-md" />
          <input id="mobile" required type="tel" placeholder="Mobile" value={authState.mobile} onChange={handleInputChange} className="w-full border p-3 rounded-md" />

          <select id="country_id" required value={authState.country_id} onChange={handleInputChange} className="w-full border p-3 rounded-md">
            <option value="">Select a country</option>
            {countries.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
          </select>

          <select id="state_id" required value={authState.state_id} onChange={handleInputChange} className="w-full border p-3 rounded-md">
            <option value="">Select a state</option>
            {loadingStates ? <option>Loading...</option> : states.map((state) => (<option key={state.id} value={state.id}>{state.name}</option>))}
          </select>
          <select id="city_id" required value={authState.city_id} onChange={handleInputChange} className="w-full border p-3 rounded-md">
  <option value="">Select a City</option>
  {loadingCities ? <option>Loading...</option> : cities.map((city) => (<option key={city.id} value={city.id}>{city.name}</option>))}
</select>


          <select id="role_id" required value={authState.role_id} onChange={handleInputChange} className="w-full border p-3 rounded-md">
            <option value="">Select a role</option>
            <option value="1">Super Admin</option>
            <option value="2">Admin</option>
            <option value="3">Employee</option>
          </select>

          <input id="password" required type="password" placeholder="Enter your password..." value={authState.password} onChange={handleInputChange} className="w-full border p-3 rounded-md" />
          <input id="password_confirmation" required type="password" placeholder="Confirm your password..." value={authState.password_confirmation} onChange={handleInputChange} className="w-full border p-3 rounded-md" />

          <div className="flex items-center gap-2">
            <input type="checkbox" id="termsAccepted" checked={authState.termsAccepted} onChange={handleInputChange} className="h-5 w-5 cursor-pointer accent-purple-500" />
            <label htmlFor="termsAccepted" className="text-sm font-medium text-gray-700">
              I agree to the terms and conditions
            </label>
          </div>

          <button type="submit" disabled={loading} className="w-full p-3 font-bold text-white bg-purple-500 rounded-md shadow-md hover:bg-purple-600">
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-sm text-center mt-4">
            Already registered?{" "}
            <Link href="/login" className="font-bold text-purple-500 hover:underline">Sign in to your account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;








