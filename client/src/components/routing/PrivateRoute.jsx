/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { Children } from "react";
import PropTypes from "prop-types";
import { Outlet, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ auth: { isAuthenticated, loading }, ...rest }) => {
  const navigate = useNavigate();

  if (!isAuthenticated && !loading) {
    return navigate("/login");
  }
  return <Outlet {...rest} />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
