"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const [formData, setformData] = useState({});
  const router = useRouter();
  const { data: session } = useSession();

  const handleChange = (e) => {
    setformData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData) {
      try {
        const response = await fetch("/api/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const loggedUser = await response.json();
          const credentials = {
            name: loggedUser?.name,
            email: formData?.email,
          };
          signIn("credentials", {
            ...credentials,
            redirect: false,
            callbackUrl: process.env.BASE_URL,
          });
          if (session?.accessToken || session?.user) {
            localStorage.setItem("accessToken", session?.accessToken);
            localStorage.setItem("user", session?.user?.name);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-3xl font-semibold mb-6 text-center text-[#332C39]">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-600 mb-2">
                Email
              </label>
              <input
                type="text"
                name="email"
                className="w-full border-2 focus:outline-none focus:border-[#C92C6D] p-3 rounded"
                value={formData.email}
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
                className="w-full border-2 focus:outline-none focus:border-[#C92C6D] p-3 rounded"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
            <button
              type="button"
              className="bg-[#C92C6D] text-[#F0EEED] p-3 rounded w-full hover:bg-[#f63d8a] font-semibold"
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#332C39] underline underline-offset-1"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
