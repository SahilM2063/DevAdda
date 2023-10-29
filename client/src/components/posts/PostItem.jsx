/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { format } from "date-fns";
import { addLike, removeLike, deletePost } from "../../actions/post.js";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, name, text, user, avatar, likes, comments, date },
  showActions,
}) => {
  useEffect(() => {}, []);
  return (
    <div className="card w-[100%] xl:w-[40%] lg:w-[60%] md:w-[80%] sm:w-[80%] flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row bg-base-100 shadow-xl items-center justify-center my-3 mb-6">
      <Link
        to={`/profile/${user}`}
        className="flex flex-col justify-evenly py-4 px-6 gap-4 items-center flex-wrap"
      >
        <img
          src={avatar}
          alt="default User"
          className="rounded-[50%] w-[40%] sm:w-[240px] md:w-[200px] lg:w-[180px]"
        />
        <h1>{name}</h1>
      </Link>
      <div className="card-body text-start self-start gap-4 w-[100%]">
        <p className="text-sm">{text}</p>
        <p className="text-sm opacity-50">
          Posted on{" "}
          <span className="font-medium text-md">
            {format(new Date(date), "yyyy/MM/dd")}
          </span>
        </p>
        {showActions && (
          <>
            <div className="flex gap-4 justify-center items-center self-start  flex-wrap">
              <button
                onClick={(e) => addLike(_id)}
                className="flex gap-1 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                >
                  <path
                    d="M7.47998 18.35L10.58 20.75C10.98 21.15 11.88 21.35 12.48 21.35H16.28C17.48 21.35 18.78 20.45 19.08 19.25L21.48 11.95C21.98 10.55 21.08 9.34997 19.58 9.34997H15.58C14.98 9.34997 14.48 8.84997 14.58 8.14997L15.08 4.94997C15.28 4.04997 14.68 3.04997 13.78 2.74997C12.98 2.44997 11.98 2.84997 11.58 3.44997L7.47998 9.54997"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M2.38 18.35V8.55002C2.38 7.15002 2.98 6.65002 4.38 6.65002H5.38C6.78 6.65002 7.38 7.15002 7.38 8.55002V18.35C7.38 19.75 6.78 20.25 5.38 20.25H4.38C2.98 20.25 2.38 19.75 2.38 18.35Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {likes.length > 0 && likes.length}
              </button>
              <button onClick={(e) => removeLike(_id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                >
                  <path
                    d="M16.52 5.65002L13.42 3.25002C13.02 2.85002 12.12 2.65002 11.52 2.65002H7.71998C6.51998 2.65002 5.21998 3.55002 4.91998 4.75002L2.51998 12.05C2.01998 13.45 2.91998 14.65 4.41998 14.65H8.41998C9.01998 14.65 9.51998 15.15 9.41998 15.85L8.91998 19.05C8.71998 19.95 9.31998 20.95 10.22 21.25C11.02 21.55 12.02 21.15 12.42 20.55L16.52 14.45"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M21.62 5.65V15.45C21.62 16.85 21.02 17.35 19.62 17.35H18.62C17.22 17.35 16.62 16.85 16.62 15.45V5.65C16.62 4.25 17.22 3.75 18.62 3.75H19.62C21.02 3.75 21.62 4.25 21.62 5.65Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="indicator">
                <span className="indicator-item badge px-1 badge-secondary">
                  {comments.length > 0 && comments.length}+
                </span>
                <Link to={`/posts/${_id}`} className="btn">
                  Discussion
                </Link>
              </div>
              {!auth.loading && user === auth.user._id && (
                <button className="btn" onClick={(e) => deletePost(_id)}>
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
          </>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
