/* eslint-disable no-unused-vars */
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAlert } from "./alert.js";
import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, ACCOUNT_DELETED } from "./types.js";


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


// Create or update profile

export const createProfile = (formData, navigate, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post("/api/profile", formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

        if (!edit) {
            navigate('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "error", 3000)));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Add Experience

export const addExperience = (formData, navigate) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put("/api/profile/experience", formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert("Experience Added", "success"));

        navigate('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "error", 3000)));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// add Education
export const addEducation = (formData, navigate) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put("/api/profile/education", formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert("Education Added", "success"));

        navigate('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "error", 3000)));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


// Delete Experience 
export const deleteExperience = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Experience removed.", "success"))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete Education
export const deleteEducation = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Education removed.", "success"))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete Account
export const deleteAccount = () => async dispatch => {
    if (window.confirm("Are you sure ? This action is not revertible.")) {
        try {
            const res = await axios.delete(`/api/profile`);

            dispatch({
                type: CLEAR_PROFILE,
            });
            dispatch({
                type: ACCOUNT_DELETED,
            });
            dispatch(setAlert("Your account has been deleted."))
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}