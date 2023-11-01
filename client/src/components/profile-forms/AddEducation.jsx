/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile.js";
import { LuSchool } from "react-icons/lu";
import { AiOutlineFileDone } from "react-icons/ai";
import { LiaBookSolid } from "react-icons/lia";
import { LiaPagerSolid } from "react-icons/lia";
import { BsCalendarDate } from "react-icons/bs";

const AddEducation = ({ addEducation }) => {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisable, toggleDisable] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } =
    formdata;

  const onchange = (e) =>
    setFormData({ ...formdata, [e.target.name]: e.target.value });

  const onsubmit = (e) => {
    e.preventDefault();
    addEducation(formdata, navigate);
  };
  return (
    <div className="hero min-h-screen bg-base-200 absolute top-0 z-[-1] flex flex-col items-center pt-4 pb-8">
      <h1 className="text-3xl font-semibold mb-4 mt-16">Add Experience</h1>
      <div className="card h-[30%] w-[94%] xl:w-[40%] lg:w-[60%] md:w-[80%] sm:w-[80%] shadow-xl bg-base-100">
        <form className="card-body gap-4 p-5" onSubmit={(e) => onsubmit(e)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <LuSchool />
                Where Knowledge Was Unlocked
              </span>
            </label>
            <input
              type="text"
              placeholder="School name"
              className="input input-bordered"
              name="school"
              value={school}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <AiOutlineFileDone />
                My Academic Achievement
              </span>
            </label>
            <input
              type="text"
              placeholder="Degree"
              className="input input-bordered"
              name="degree"
              value={degree}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <LiaBookSolid />
                Exploring My Passion
              </span>
            </label>
            <input
              type="text"
              placeholder="Field of study"
              className="input input-bordered"
              name="fieldofstudy"
              value={fieldofstudy}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <BsCalendarDate />
                The Academic Journey Begins &#40;Start date&#41;
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
              <span className="label-text">Continuing My Academic Quest</span>
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
              <span className="label-text flex items-center gap-2">
                <BsCalendarDate />A Chapter of Growth &#40;End date&#41;
              </span>
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
              <span className="label-text flex items-center gap-2">
                <LiaPagerSolid />
                Summarizing My Academic Adventure
              </span>
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
