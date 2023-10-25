/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <ul className="menu lg:menu-horizontal xl:menu-horizontal md:menu-horizontal menu-vertical px-1 gap-2 mt-6">
      <li className="text-base">
        <Link to={"/edit-profile"}>Edit Profile</Link>
      </li>
      <li className="text-base">
        <Link to={"/add-experience"}>Add Experience</Link>
      </li>
      <li className="text-base">
        <Link to={"/add-education"}>Add Education</Link>
      </li>
    </ul>
  );
};

export default DashboardActions;
