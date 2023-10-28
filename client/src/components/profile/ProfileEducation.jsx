/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

const ProfileEducation = ({
  education: { school, from, to, degree, fieldofstudy, description },
}) => {
  return (
    <div className="bg-base-100 p-6 flex flex-col gap-2 items-start m-2 mb-4 rounded-md text-start">
      <h1 className="text-xl font-bold">{school}</h1>
      <p className="font-semibold">
        Field Of Study : <span className="font-normal text-sm">{fieldofstudy}</span>
      </p>
      <p className="font-semibold">
        Degree : <span className="font-normal text-sm">{degree}</span>
      </p>
      <p className="font-medium text-sm">
        {format(new Date(from), "yyyy/MM/dd")} -{" "}
        {!to ? " Now" : format(new Date(to), "yyyy/MM/dd")}
      </p>
      <p className="font-semibold">
        Description : <span className="font-normal text-sm">{description}</span>
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
