/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");
  return (
    <>
      <h1 className="text-2xl font-semibold ">Leave a comment</h1>
      <div className="card h-[30%] w-[94%] xl:w-[40%] lg:w-[60%] md:w-[80%] sm:w-[80%] shadow-xl bg-base-100">
        <form
          className="card-body gap-0 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            addComment(postId, { text });
            setText("");
          }}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter comment text</span>
            </label>
            <textarea
              placeholder="Say something"
              className="textarea textarea-bordered h-24"
              name="bio"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-control mt-6">
            <button className="btn">post</button>
          </div>
        </form>
      </div>
    </>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
