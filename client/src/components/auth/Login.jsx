/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
    console.log("Success");
  };

  return (
    <div className="hero min-h-screen bg-base-200 absolute top-0 z-[-1] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-4">Login</h1>
      <div className="card h-[30%] w-[94%] xl:w-[40%] lg:w-[60%] md:w-[80%] sm:w-[80%] shadow-xl bg-base-100">
        <form className="card-body gap-0 p-5" onSubmit={(e) => onsubmit(e)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              name="email"
              value={email}
              onChange={(e) => onchange(e)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              name="password"
              value={password}
              onChange={(e) => onchange(e)}
              required
              minLength={6}
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

export default Login;