/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile.js";

const AddExperience = ({ addExperience }) => {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisable, toggleDisable] = useState(false);

  const { title, company, location, from, to, current, description } = formdata;

  const onchange = (e) =>
    setFormData({ ...formdata, [e.target.name]: e.target.value });

  const onsubmit = (e) => {
    e.preventDefault();
    addExperience(formdata, navigate);
  };
  return (
    <div className="hero min-h-screen bg-base-200 absolute top-0 z-[-1] flex flex-col items-center pt-4 pb-8">
      <h1 className="text-3xl font-semibold mb-4 mt-16">Add Experience</h1>
      <div className="card h-[30%] w-[94%] xl:w-[40%] lg:w-[60%] md:w-[80%] sm:w-[80%] shadow-xl bg-base-100">
        <form className="card-body gap-4 p-5" onSubmit={(e) => onsubmit(e)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">My Professional Hat</span>
            </label>
            <input
              type="text"
              placeholder="Job title"
              className="input input-bordered"
              name="title"
              value={title}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">My Professional Playground</span>
            </label>
            <input
              type="text"
              placeholder="Company name"
              className="input input-bordered"
              name="company"
              value={company}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Where I Flourished</span>
            </label>
            <input
              type="text"
              placeholder="Location"
              className="input input-bordered"
              name="location"
              value={location}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                The Starting Point of My Career &#40;Start date&#41;
              </span>
            </label>
            <input
              type="date"
              placeholder="From date"
              className="input input-bordered"
              name="from"
              value={from}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Currently working ?</span>
              <input
                type="checkbox"
                className="checkbox"
                checked={current}
                name="current"
                value={current}
                onChange={(e) => {
                  setFormData({ ...formdata, current: !current });
                  toggleDisable(!toDateDisable);
                }}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">A Journey Worth Remembering &#40;End date&#41;</span>
            </label>
            <input
              type="date"
              placeholder="To date"
              className="input input-bordered"
              name="to"
              value={to}
              disabled={toDateDisable ? "disabled" : ""}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">My Work, My Story</span>
            </label>
            <textarea
              placeholder="Job Description"
              className="textarea textarea-bordered h-24"
              name="description"
              value={description}
              onChange={(e) => onchange(e)}
            ></textarea>
          </div>
          <div className="form-control w-full mt-6 flex justify-between flex-row">
            <button className="btn w-[48%]">Add</button>
            <Link to={"/dashboard"} className="btn w-[48%]">
              <button>Go back</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
