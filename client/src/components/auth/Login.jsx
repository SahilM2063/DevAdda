/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth.js";
import { setAlert } from "../../actions/alert.js";
import { BiUser } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { BiLockAlt } from "react-icons/bi";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="hero min-h-screen bg-base-200 absolute top-0 z-[-1] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-4 flex items-center gap-4">
        <BiUser />
        Login
      </h1>
      <div className="card h-[30%] w-[94%] xl:w-[40%] lg:w-[60%] md:w-[80%] sm:w-[80%] shadow-xl bg-base-100">
        <form className="card-body gap-0 p-5" onSubmit={(e) => onsubmit(e)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-1">
                <HiOutlineMail />
                Email
              </span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              name="email"
              value={email}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-1">
                <BiLockAlt />
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              name="password"
              value={password}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn">Login</button>
          </div>
          <p className="mt-3 text-sm">
            Don&#39;t have an account ?{" "}
            <Link to={"/register"} className="font-semibold">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
