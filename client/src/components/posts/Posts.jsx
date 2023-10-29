/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner.jsx";
import { getPosts } from "../../actions/post.js";

const Posts = ({ getPosts, post: { loading, posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <div>
      {posts &&
        posts.map((post) => (
          <h4 key={post._id}>
            {post.name}
            <br />
            {post._id} <br /> {post.text}
          </h4>
        ))}
    </div>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
