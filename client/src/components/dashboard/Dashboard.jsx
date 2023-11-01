/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAccount, getcurrentprofile } from "../../actions/profile.js";
import Spinner from "../layout/Spinner.jsx";
import DashboardActions from "./DashboardActions.jsx";
import Experience from "./Experience.jsx";
import Education from "./Education.jsx";
import { PiHandWaving } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md/index.esm.js";
import { BsQuestionOctagon } from "react-icons/bs";

const Dashboard = ({
  getcurrentprofile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getcurrentprofile();
  }, [getcurrentprofile]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6 mt-2 menu">DASHBOARD</h1>
          <p className="font-semibold text-xl flex items-center gap-2">
            <PiHandWaving />
            Hello, {user && user.name}
          </p>
          {profile !== null ? (
            <>
              <DashboardActions />
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
              <button
                onClick={() => deleteAccount()}
                className="btn btn-error mt-7 flex items-center gap-2 mb-6"
              >
                <MdDeleteOutline />
                Delete my account
              </button>
            </>
          ) : (
            <>
              <h1 className="max-w-[90%] flex flex-col gap-3 md:flex-row lg:flex-row xl:flex-row items-center">
                <BsQuestionOctagon />
                You haven&#39;t completed your profile ?{" "}
                <Link to={"/create-profile"} className="btn">
                  Create Profile
                </Link>
              </h1>
            </>
          )}
        </>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  getcurrentprofile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getcurrentprofile, deleteAccount })(
  Dashboard
);
