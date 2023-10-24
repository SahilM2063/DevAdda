/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getcurrentprofile } from "../../actions/profile.js";

const Dashboard = ({ getcurrentprofile, auth, profile }) => {
  useEffect(() => {
    getcurrentprofile();
  }, []);

  return (
    <div className="w-full h-full justify-center flex items-center">
      <h1>This Is Dashboard</h1>
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
