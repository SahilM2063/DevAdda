/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getPost } from "../../actions/post.js";
import Spinner from "../layout/Spinner.jsx";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import PostItem from "../posts/PostItem.jsx";
import CommentForm from "./CommentForm.jsx";
import CommentItem from "./CommentItem.jsx";

const Post = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost, id]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <div className="hero text-center min-h-screen bg-base-200 absolute top-[-1] flex flex-col pt-10 gap-3">
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div >
        <h1 className="text-2xl font-semibold text-center my-4">Comments</h1>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
      <Link to={"/posts"} className="btn">
        Go back
      </Link>
    </div>
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
