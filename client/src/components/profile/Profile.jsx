/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProfileByID } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const Profile = ({ getProfileByID, profile: { profile, loading }, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileByID(id);
  }, [getProfileByID, id]);

  return (
    <>
      {profile !== null && !loading ? (
        <>
          <h1>{profile.user.name} s profile</h1>
          <Link className="btn mx-2" to={"/profiles"}>
            Go back
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link className="btn mx-2" to={"/edit-profile"}>
                Edit Profile
              </Link>
            )}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileByID: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileByID })(Profile);
