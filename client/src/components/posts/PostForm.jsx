/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post.js";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");
  return (
    <>
      <h1 className="text-2xl font-semibold ">Create post here..</h1>
      <div className="card h-[30%] w-[94%] xl:w-[40%] lg:w-[60%] md:w-[80%] sm:w-[80%] shadow-xl bg-base-100">
        <form
          className="card-body gap-0 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ text });
            setText("");
          }}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter post text</span>
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
            <button className="btn">Create</button>
          </div>
        </form>
      </div>
    </>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
