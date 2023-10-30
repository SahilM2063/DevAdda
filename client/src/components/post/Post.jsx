/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getPost } from "../../actions/post.js";
import Spinner from "../layout/Spinner.jsx";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import PostItem from "../posts/PostItem.jsx";
import CommentForm from "./CommentForm.jsx";

const Post = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost, id]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to={"/posts"} className="btn">
        Go back
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
