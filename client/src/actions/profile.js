/* eslint-disable no-unused-vars */
import axios from "axios";
import { setAlert } from "./alert.js";
import { GET_PROFILE, PROFILE_ERROR } from "./types.js";


// Get Current user profile

export const getcurrentprofile = () => async dispatch => {
    try {
        const res = await axios.get("/api/profile/me");

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}