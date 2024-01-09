"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Nav = () => {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="bg-[#332C39] font-semibold text-[#F0EEED] shadow-xl justify-start">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex">
          <Link href="/">
            <img src="/images/check-list.png" className="h-8" alt="todo" />
          </Link>
          <span className="text-2xl font-semibold whitespace-nowrap ml-3">
            To Do
          </span>
        </div>
        {session && (
          <div>
            <label>
              Hello, {session?.user?.name ? session?.user?.name : "User"}!
            </label>
            <button
              onClick={() => handleSignOut()}
              type="button"
              className="p-1.5 ml-3 text-md rounded-md bg-[#C92C6D] font-semibold text-[#F0EEED]"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
