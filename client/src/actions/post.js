/* eslint-disable no-unused-vars */
import axios from "axios";
import { setAlert } from "./alert.js"
import { ADD_POST, DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES } from "./types";


// get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


// Add like
export const addLike = (postId) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


// remove like
export const removeLike = (postId) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


// delete post
export const deletePost = (postId) => async dispatch => {
    try {
        await axios.delete(`/api/posts/${postId}`);

        dispatch({
            type: DELETE_POST,
            payload: postId
        });

        dispatch(setAlert("Post deleted successfully", "success"));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


// add post
export const addPost = (formdata) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/posts', formdata, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert("Post created", "success"));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}