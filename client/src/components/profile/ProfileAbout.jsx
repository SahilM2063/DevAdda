/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div className="w-[90%] border items-center py-6 rounded-md text-center">
      {bio && (
        <>
          <h1 className="text-xl font-bold">
            {name}&#39;s bio
          </h1>
          <p className="my-6 mx-2">{bio}</p>
          <hr />
        </>
      )}
      <div className="w-full my-4 flex flex-col justify-center items-center gap-6">
        <h1 className="text-xl font-bold">Skills</h1>
        <ul className="max-w-lg flex justify-center gap-3 flex-wrap">
          {skills.map((skill, index) => (
            <kbd className="kbd cursor-pointer" key={index}>
              {skill}
            </kbd>
          ))}
        </ul>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
