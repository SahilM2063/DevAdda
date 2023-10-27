/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile,
  profile: {
    user: { _id, name, avatar },
    status,
    skills,
    location,
    company,
  },
}) => {
  return (
    <>
      <div className="hero overflow-auto">
        {profile && profile.user ? (
          <div className="card w-[100%] xl:w-[40%] lg:w-[60%] md:w-[80%] sm:w-[80%] flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row bg-base-100 shadow-xl items-center justify-center my-6">
            <img
              src={avatar}
              alt="default User"
              className="rounded-[50%] w-[30%] px-6"
            />
            <div className="card-body self-start gap-4">
              <h2 className="card-title text-2xl font-bold">{name}</h2>
              <p>
                {status} at{" "}
                <span className="font-medium text-md">{company}</span>
              </p>
              <p>{location}</p>
              <div>
                <Link className="link text-sm ">View Profile</Link>
              </div>
              <ul className="flex gap-2 flex-wrap">
                {skills.slice(0, 4).map((skill, index) => (
                  <li key={index}>
                    <kbd className="kbd cursor-pointer">{skill}</kbd>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          "yo name"
        )}
      </div>
    </>
  );
};
ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
