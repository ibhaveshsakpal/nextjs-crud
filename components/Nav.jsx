import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="bg-blue-800 text-white shadow-xl justify-start">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-start mx-auto p-4">
        <Link href="/">
          <img src="/images/check-list.png" className="h-8" alt="todo" />
        </Link>
        <span className="text-2xl font-semibold whitespace-nowrap ml-3">
          ToDo
        </span>
      </div>
    </nav>
  );
};

export default Nav;
