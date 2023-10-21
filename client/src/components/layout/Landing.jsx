/* eslint-disable no-unused-vars */
import React from "react";

const Landing = () => {
  return (
    <div
      className="hero min-h-screen absolute top-0 z-[-1] overflow-hidden"
      style={{
        // backgroundImage:
        //   "url(https://img.freepik.com/free-vector/background-pixel-rain-abstract_23-2148374569.jpg?w=996&t=st=1697898430~exp=1697899030~hmac=f19839b5dc38f190aa4f6a2d983b32093fbc311b47cc49e3c96cefc00cac6c94)",
        backgroundImage:
          "url(https://img.freepik.com/free-photo/closeup-computer-screen-software-developer-typing-programming-language-it-startup-agency-display-concept-system-engineer-writing-source-code-scrolling-text-database-functions-script_482257-33355.jpg?w=1060&t=st=1697905101~exp=1697905701~hmac=2df7b9619317db32118b8e41412cdf4a6db98ea7a8660baaa03d15d54fd515ab)",
      }}
    >
      <div className="hero-overlay bg-opacity-80"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-screen-lg">
          <h1 className="mb-8 text-5xl font-bold">A Place For Developers</h1>
          <p className="mb-8 text-base tracking-wide max-w-screen-md text-center">
            Welcome to <span className="font-bold text-[17px]">DevAdda</span>, your online hub for connecting with fellow
            developers. We are all about bringing coders together in one space
            to discuss, collaborate, and share their passion for coding. Whether
            you are a seasoned pro or just starting out, DevAdda is your place
            to meet, learn, and grow.
          </p>
          <button className="btn px-6 mx-2">Register</button>
          <button className="btn px-6 mx-2">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
