/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { BiMessageSquareAdd } from "react-icons/bi";
import { MdOutlineAddToQueue } from "react-icons/md/index.esm";

const DashboardActions = () => {
  return (
    <ul className="menu lg:menu-horizontal xl:menu-horizontal md:menu-horizontal menu-vertical px-1 gap-2 mt-6">
      <li className="text-base">
        <Link to={"/edit-profile"} className="flex items-center gap-2">
          <FiEdit />
          Edit Profile
        </Link>
      </li>
      <li className="text-base">
        <Link to={"/add-experience"} className="flex items-center gap-2">
          <BiMessageSquareAdd />
          Add Experience
        </Link>
      </li>
      <li className="text-base">
        <Link to={"/add-education"} className="flex items-center gap-2">
          <MdOutlineAddToQueue />
          Add Education
        </Link>
      </li>
    </ul>
  );
};

export default DashboardActions;
