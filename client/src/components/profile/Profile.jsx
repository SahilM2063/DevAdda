/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProfileByID } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";

const Profile = ({ getProfileByID, profile: { profile, loading }, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileByID(id);
  }, [getProfileByID, id]);

  return (
    <>
      {profile !== null && !loading ? (
        <div className="hero text-center min-h-screen bg-base-200 absolute top-[-1] flex flex-col pt-16 gap-6">
          <h1 className="text-3xl font-bold">
            {profile.user.name}&#39;s Profile
          </h1>
          <ProfileTop profile={profile} />
          <ProfileAbout profile={profile} />
          <div className="flex flex-wrap justify-center max-w-lg">
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link className="btn mx-2" to={"/edit-profile"}>
                  Edit Profile
                </Link>
              )}
            <Link className="btn mx-2" to={"/profiles"}>
              Go back
            </Link>
          </div>
        </div>
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
