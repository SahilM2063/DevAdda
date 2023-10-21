/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 flex shadow-lg md:px-6 px-3">
      <Link to={"/"} className="font-bold normal-case text-3xl flex-1">
        DevAdda.
      </Link>
      <div className="navbar-start w-10">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-xl w-32 right-3"
          >
            <li>
              <Link to={"/developers"}>Developers</Link>
            </li>
            <li>
              <Link to={"/register"}>Register</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-3">
          <li className="text-base">
            <Link to={"/developers"}>Developers</Link>
          </li>
          <li className="text-base">
            <Link to={"/register"}>Register</Link>
          </li>
          <li className="text-base">
            <Link to={"/login"}>Login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
