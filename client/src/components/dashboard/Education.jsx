/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr
      key={edu.id}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {education.indexOf(edu) + 1}
      </td>
      <td className="px-6 py-4">{edu.school}</td>
      <td className="px-6 py-4">{edu.degree}</td>
      <td className="px-6 py-4">{edu.fieldofstudy}</td>
      <td className="px-6 py-4">
        {format(new Date(edu.from), "yyyy/MM/dd")} -
        {edu.to === null ? " Now" : format(new Date(edu.to), " yyyy/MM/dd")}
      </td>
      <td className="px-6 py-4">
        <Link
          onClick={() => deleteEducation(edu._id)}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Delete
        </Link>
      </td>
    </tr>
  ));

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[94%] my-4">
      <h1 className="text-xl font-bold text-center mb-3">Educations</h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sr No.
            </th>
            <th scope="col" className="px-6 py-3">
              School
            </th>
            <th scope="col" className="px-6 py-3">
              Degree
            </th>
            <th scope="col" className="px-6 py-3">
              Field Of Study
            </th>
            <th scope="col" className="px-6 py-3">
              Time Period
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
