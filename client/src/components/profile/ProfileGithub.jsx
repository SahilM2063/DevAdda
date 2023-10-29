/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile.js";
import Spinner from "../layout/Spinner.jsx";

const ProfileGithub = ({ getGithubRepos, username, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Github repos</h1>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <>
            <div
              key={repo._id}
              className="w-full bg-base-100 flex justify-between items-center mb-4 p-4"
            >
              <div className="text-start">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold"
                >
                  {repo.name}
                </a>
                <p className="text-xs">{repo.description}</p>
              </div>
              <div>
                <ul className="flex flex-col items-end gap-1">
                  <li className="badge w-full rounded-sm bg-[#352F44] border-[#352F44]">
                    Stars : {repo.stargazers_count}
                  </li>
                  <li className="badge w-full rounded-sm bg-[#5C5470] border-[#5C5470]">
                    Watchers : {repo.watchers_count}
                  </li>
                  <li className="badge w-full rounded-sm bg-[#393646] border-[#393646]">
                    Forks : {repo.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          </>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
