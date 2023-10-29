/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { format } from "date-fns";

const PostItem = ({
  auth,
  post: { _id, name, text, user, avatar, likes, comments, date },
}) => {
  return (
    <div className="card w-[100%] xl:w-[40%] lg:w-[60%] md:w-[80%] sm:w-[80%] flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row bg-base-100 shadow-xl items-center justify-center my-3 py-2">
      <div className="flex flex-col justify-evenly px-6 gap-4 items-center">
        <img
          src={avatar}
          alt="default User"
          className="rounded-[50%] w-[40%] sm:w-[280px] md:w-[300px]"
        />
        <h1>{name}</h1>
      </div>
      <div className="card-body text-start self-start gap-4">
        <p className="text-sm">{text}</p>
        <p className="text-sm opacity-50">
          Posted on{" "}
          <span className="font-medium text-md">
            {format(new Date(date), "yyyy/MM/dd")}
          </span>
        </p>
        <div className="flex gap-2 justify-center self-start  flex-wrap">
          <button className="btn indicator">
            Like {likes.length > 0 && likes.length}
          </button>
          <button className="btn">UnLike</button>
          <div className="indicator">
            <span className="indicator-item badge px-1 badge-secondary">
              {comments.length > 0 && comments.length}+
            </span>
            <Link to={`/posts/${_id}`} className="btn">
              Discussion
            </Link>
          </div>
          {!auth.loading && user === auth.user._id && (
            <button className="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PostItem);
