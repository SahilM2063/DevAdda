/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner.jsx";
import { getPosts } from "../../actions/post.js";
import PostItem from "./PostItem.jsx";

const Posts = ({ getPosts, post: { loading, posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="hero text-center min-h-screen bg-base-200 absolute top-[-1] flex flex-col pt-10 gap-6">
            <h1 className="text-3xl font-bold">Welcome to community</h1>
            {posts.length > 0 ? (
              <>
                {posts.map((post) => (
                  <PostItem post={post} key={post._id} />
                ))}
              </>
            ) : (
              <h4>No posts found</h4>
            )}
          </div>
        </>
      )}
    </>
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
