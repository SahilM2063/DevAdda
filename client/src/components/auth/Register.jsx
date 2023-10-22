/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const { name, email, password, confirmPass } = formData;

  const onchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPass) {
      console.log("Password doesn't match!");
    } else {
      console.log("Success");

      //------------- Will implement below code using redux , This was for testing.
      //   const newUser = {
      //     name,
      //     email,
      //     password,
      //   };

      //   try {
      //     const config = {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     };

      //     const body = JSON.stringify(newUser);

      //     const res = await axios.post("/api/users", body, config);
      //     console.log(res.data);
      //   } catch (err) {
      //     console.error(err.response.data);
      //   }
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200 absolute top-0 z-[-1] flex flex-col items-center justify-center pt-16 ">
      <h1 className="text-3xl font-semibold mb-4">Register</h1>
      <div className="card h-[30%] w-[94%] xl:w-[40%] lg:w-[60%] md:w-[80%] sm:w-[80%] shadow-xl bg-base-100">
        <form className="card-body gap-0 p-5" onSubmit={(e) => onsubmit(e)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text leading-4">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered"
              name="name"
              value={name}
              onChange={(e) => onchange(e)}
              required
            />
          </div>
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="confirm password"
              className="input input-bordered"
              name="confirmPass"
              value={confirmPass}
              onChange={(e) => onchange(e)}
              required
              minLength={6}
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn">Register</button>
          </div>
          <p className="mt-3 text-sm">
            Already have an account ?{" "}
            <Link to={"/login"} className="font-semibold">
              Login now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
