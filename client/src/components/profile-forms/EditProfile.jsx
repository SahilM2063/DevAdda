/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getcurrentprofile } from "../../actions/profile.js";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getcurrentprofile,
}) => {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    githubusername: "",
    twitter: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    instagram: "",
  });

  const [displaySocialLinks, toggleSocialLinks] = useState(false);

  useEffect(() => {
    getcurrentprofile();

    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      skills: loading || !profile.skills ? "" : profile.skills.join(","),
      githubusername:
        loading || !profile.githubusername ? "" : profile.githubusername,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
    });
  }, [loading, getcurrentprofile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    twitter,
    facebook,
    youtube,
    linkedin,
    instagram,
  } = formdata;

  const onchange = (e) =>
    setFormData({ ...formdata, [e.target.name]: e.target.value });

  const onsubmit = (e) => {
    e.preventDefault();
    createProfile(formdata, navigate, true);
  };

  return (
    <div className="hero min-h-screen bg-base-200 absolute top-0 z-[-1] flex flex-col items-center pt-4 pb-8">
      <h1 className="text-3xl font-semibold mb-4 mt-16">Edit Profile</h1>
      <div className="card h-[30%] w-[94%] xl:w-[40%] lg:w-[60%] md:w-[80%] sm:w-[80%] shadow-xl bg-base-100">
        <form className="card-body gap-4 p-5" onSubmit={(e) => onsubmit(e)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Your current status</span>
            </label>
            <select
              className="select select-bordered"
              name="status"
              value={status}
              onChange={(e) => onchange(e)}
            >
              <option disabled selected>
                Select your profession
              </option>
              <option value={"Manager"}>Manager</option>
              <option value={"Developer"}>Developer</option>
              <option value={"Junior Developer"}>Junior Developer</option>
              <option value={"Senior Developer"}>Senior Developer</option>
              <option value={"Data Scientist"}>Data Scientist</option>
              <option value={"Data Engineer"}>Data Engineer</option>
              <option value={"Instructor"}>Instructor or Teacher</option>
              <option value={"Student or Learning"}>Student or Learning</option>
              <option value={"Intern"}>Intern</option>
              <option value={"Other"}>Other</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Craft Your Company Name</span>
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
              <span className="label-text">Share Your Online Oasis</span>
            </label>
            <input
              type="text"
              placeholder="Website name"
              className="input input-bordered"
              name="website"
              value={website}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Base of Operations</span>
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
              <span className="label-text">Showcase Your Talents</span>
            </label>
            <input
              type="text"
              placeholder="Skills"
              className="input input-bordered"
              name="skills"
              value={skills}
              onChange={(e) => onchange(e)}
            />
            <label className="label">
              <span className="label-text-alt">
                <small>
                  Use comma separated values &#40;eg. HTML, CSS, JS&#41;
                </small>
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Coding Alias</span>
            </label>
            <input
              type="text"
              placeholder="Github username"
              className="input input-bordered"
              name="githubusername"
              value={githubusername}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Paint Your Portrait</span>
            </label>
            <textarea
              placeholder="Bio"
              className="textarea textarea-bordered h-24"
              name="bio"
              value={bio}
              onChange={(e) => onchange(e)}
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label items-center">
              <span className="label-text">
                Add social networks &#40;Optional&#41;
              </span>
              <input
                type="checkbox"
                className="checkbox checkbox-md"
                onClick={() => toggleSocialLinks(!displaySocialLinks)}
              />
              {/* <input
                  type="checkbox"
                  className="toggle cursor-pointer"
                  onClick={() => toggleSocialLinks(!displaySocialLinks)}
                /> */}
            </label>
          </div>

          {displaySocialLinks && (
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Tweeting Life&#39;s Moments
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Twitter"
                  className="input input-bordered"
                  name="twitter"
                  value={twitter}
                  onChange={(e) => onchange(e)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Connecting Lives, One Profile at a Time
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Facebook"
                  className="input input-bordered"
                  name="facebook"
                  value={facebook}
                  onChange={(e) => onchange(e)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Lights, Camera, Action, and So Much More
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Youtube"
                  className="input input-bordered"
                  name="youtube"
                  value={youtube}
                  onChange={(e) => onchange(e)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Building Professional Bridges
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Linkedin"
                  className="input input-bordered"
                  name="linkedin"
                  value={linkedin}
                  onChange={(e) => onchange(e)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Capturing Life&#39;s Moments in Pixels
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Instagram"
                  className="input input-bordered"
                  name="instagram"
                  value={instagram}
                  onChange={(e) => onchange(e)}
                />
              </div>
            </>
          )}

          <div className="form-control w-full mt-6 flex justify-between flex-row">
            <button className="btn w-[48%]">Update</button>
            <Link to={"/dashboard"} className="btn w-[48%]">
              <button>Go back</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getcurrentprofile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getcurrentprofile })(
  EditProfile
);
