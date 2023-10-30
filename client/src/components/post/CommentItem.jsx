/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { deleteComment } from "../../actions/post.js";

const CommentItem = ({
  postId,
  comment: { _id, name, text, avatar, user, date },
  auth,
  deleteComment,
}) => {
  return (
    <>
      <div className="card w-full flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row bg-base-100 shadow-xl items-center justify-center my-3 mb-6 p-2">
        <div className="w-[20%] text-start flex flex-col justify-center items-center gap-2">
          <Link to={`/profile/${user}`}>
            <img
              src={avatar}
              alt="default_use"
              className="rounded-[50%] max-w-[50%] m-auto"
            />
          </Link>
          <p className="text-xs">{name}</p>
        </div>
        <div className="flex flex-1 flex-col justify-center items-start gap-2 p-4 ">
          <h4>{text}</h4>
          <p className="text-xs opacity-40">
            commented on {format(new Date(date), "yyyy/MM/dd")}
          </p>
        </div>
        {!auth.loading && user === auth.user._id && (
          <button onClick={(e) => deleteComment(postId, _id)} className="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
            >
              <path
                d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.33 16.5H13.66"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 12.5H14.5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
