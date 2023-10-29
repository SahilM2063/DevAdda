/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loaduser } from "./actions/auth";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile.jsx";
import AddExperience from "./components/profile-forms/AddExperience.jsx";
import AddEducation from "./components/profile-forms/AddEducation.jsx";
import Profiles from "./components/profiles/Profiles.jsx";
import Profile from "./components/profile/Profile.jsx";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loaduser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/add-experience" element={<AddExperience />} />
            <Route path="/add-education" element={<AddEducation />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<Post />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
