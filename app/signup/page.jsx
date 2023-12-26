"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useState } from "react";

const SignUp = () => {
  const [formData, setformData] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    setformData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //   useEffect(()=>{
  // console.log("form ", formData);
  //   },[formData])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form ", formData);

    if (formData) {
      try {
        const response = await fetch("/api/signup/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          alert("Account created successfully. Redirecting to login page!");
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-semibold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full border-2 focus:outline-none focus:border-blue-500 p-3 rounded"
              value={formData?.name}
              onChange={handleChange}
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 mb-2">
              Email
            </label>
            <input
              type="text"
              name="email"
              className="w-full border-2 focus:outline-none focus:border-blue-500 p-3 rounded"
              value={formData?.email}
              onChange={handleChange}
              placeholder="your@example.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full border-2 focus:outline-none focus:border-blue-500 p-3 rounded"
              value={formData?.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="button"
            className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
