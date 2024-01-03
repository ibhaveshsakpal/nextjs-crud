"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignUp = () => {
  const [formData, setformData] = useState({});
  const router = useRouter();
  const { data: session } = useSession();
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setformData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    let valid = true;
    const errors = {};

    if (!formData.name) {
      valid = false;
      errors.name = "Invalid Name";
    }

    if (
      !formData.email ||
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
    ) {
      valid = false;
      errors.email = "Invalid Email";
    }

    if (!formData.password) {
      valid = false;
      errors.password = "Invalid Passoword";
    }

    setFormErrors(errors);
    return valid;
  };

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
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
          } else {
            const error = await response.json();
            setFormErrors({ email: error.message });
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-semibold mb-6 text-center">Sign Up</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full border-2 focus:outline-none focus:border-[#C92C6D] p-3 rounded"
              value={formData?.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
            {formErrors.name && (
              <label className="text-red-500 text-sm">{formErrors.name}</label>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 mb-2">
              Email
            </label>
            <input
              type="text"
              name="email"
              className="w-full border-2 focus:outline-none focus:border-[#C92C6D] p-3 rounded"
              value={formData?.email}
              onChange={handleChange}
              placeholder="your@example.com"
              required
            />
            {formErrors.email && (
              <label className="text-red-500 text-sm">{formErrors.email}</label>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full border-2 focus:outline-none focus:border-[#C92C6D] p-3 rounded"
              value={formData?.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            {formErrors.password && (
              <label className="text-red-500 text-sm">
                {formErrors.password}
              </label>
            )}
          </div>
          <button
            type="button"
            className="bg-[#C92C6D] text-[#F0EEED] p-3 rounded w-full hover:bg-[#f63d8a] font-semibold"
            onClick={(e) => handleSubmit(e)}
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#332C39] underline underline-offset-1"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
