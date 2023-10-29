/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const AuthLinks = () => {
    return (
      <ul className="menu menu-horizontal px-1 gap-3">
        <li className="text-base">
          <Link to={"/profiles"}>Developers</Link>
        </li>
        <li className="text-base">
          <Link to={"/posts"}>Posts</Link>
        </li>
        <li className="text-base">
          <Link to={"/dashboard"}>Dashboard</Link>
        </li>
        <li className="text-base">
          <Link onClick={logout} to={"/"}>
            Logout
          </Link>
        </li>
      </ul>
    );
  };

  const GuestLinks = () => {
    return (
      <ul className="menu menu-horizontal px-1 gap-3">
        <li className="text-base">
          <Link to={"/profiles"}>Developers</Link>
        </li>
        <li className="text-base">
          <Link to={"/register"}>Register</Link>
        </li>
        <li className="text-base">
          <Link to={"/login"}>Login</Link>
        </li>
      </ul>
    );
  };

  const MenuBoxAuthLinks = () => {
    return (
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-xl w-32 right-3"
      >
        <li>
          <Link to={"/profiles"}>Developers</Link>
        </li>
        <li>
          <Link to={"/posts"}>Posts</Link>
        </li>
        <li>
          <Link to={"/dashboard"}>Dashboard</Link>
        </li>
        <li>
          <Link to={"/"} onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    );
  };

  const MenuBoxGuestLinks = () => {
    return (
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
    );
  };

  return (
    <div className="navbar bg-base-100 flex shadow-lg md:px-6 px-3 justify-between">
      <Link to={"/"} className="font-bold normal-case text-3xl">
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
          {!loading && (
            <>
              {isAuthenticated ? <MenuBoxAuthLinks /> : <MenuBoxGuestLinks />}
            </>
          )}
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        {!loading && <>{isAuthenticated ? <AuthLinks /> : <GuestLinks />}</>}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
