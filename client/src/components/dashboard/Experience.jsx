/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr
      key={exp.id}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {experience.indexOf(exp) + 1}
      </td>
      <td className="px-6 py-4">{exp.company}</td>
      <td className="px-6 py-4">{exp.title}</td>
      <td className="px-6 py-4">
        {format(new Date(exp.from), "yyyy/MM/dd")} -
        {exp.to === null ? " Now" : format(new Date(exp.to), " yyyy/MM/dd")}
      </td>
      <td className="px-6 py-4">
        <Link
          onClick={() => deleteExperience(exp._id)}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Delete
        </Link>
      </td>
    </tr>
  ));

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[94%] mb-4 mt-8">
      <h1 className="text-xl font-bold text-center mb-3">Experiences</h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sr No.
            </th>
            <th scope="col" className="px-6 py-3">
              Company
            </th>
            <th scope="col" className="px-6 py-3">
              Job Title
            </th>
            <th scope="col" className="px-6 py-3">
              Time Period
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
