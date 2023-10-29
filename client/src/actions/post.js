/* eslint-disable no-unused-vars */
import axios from "axios";
import { setAlert } from "./alert.js"
import { GET_POSTS, POST_ERROR } from "./types";



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