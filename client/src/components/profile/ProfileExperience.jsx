/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

const ProfileExperience = ({
  experience: { company, from, to, title, location, description },
}) => {
  return (
    <div className="bg-base-100 p-6 flex flex-col gap-2 items-start m-2 mb-4 rounded-md text-start">
      <h1 className="text-xl font-bold">{company}</h1>
      <p className="font-semibold">
        Position : <span className="font-normal text-sm">{title}</span>
      </p>
      <p className="font-medium text-sm">
        {format(new Date(from), "yyyy/MM/dd")} -{" "}
        {!to ? " Now" : format(new Date(to), "yyyy/MM/dd")}
      </p>
      <p className="font-semibold">
        Location : <span className="font-normal text-sm">{location}</span>
      </p>
      <p className="font-semibold">
        Description : <span className="font-normal text-sm">{description}</span>
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
