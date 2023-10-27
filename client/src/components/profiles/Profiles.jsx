/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-labels */
import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";
import Spinner from "../layout/Spinner.jsx";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-center text-3xl font-semibold my-4">
            Developers Profiles
          </h1>
          <p className="text-center mb-8">
            Explore and connect with worldwide Developers
          </p>
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <ProfileItem key={profile._id} profile={profile} />
            ))
          ) : (
            <h4>No Profiles Found</h4>
          )}
        </>
      )}
    </>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
