/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getcurrentprofile } from "../../actions/profile.js";
import Spinner from "../layout/Spinner.jsx";
import DashboardActions from "./DashboardActions.jsx";

const Dashboard = ({
  getcurrentprofile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getcurrentprofile();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6 mt-2 menu">DASHBOARD</h1>
          <p className="font-semibold text-xl">Hello, {user && user.name}</p>
          {profile !== null ? (
            <>
              <DashboardActions />
            </>
          ) : (
            <>
              <h1 className="max-w-[90%] flex flex-col gap-3 md:flex-row lg:flex-row xl:flex-row items-center">
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
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getcurrentprofile })(Dashboard);
