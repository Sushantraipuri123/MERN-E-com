import React from "react";
import { Outlet } from "react-router-dom";
import './Account.css';

function Account() {
  return (
    <>
      <div className="container-fluid bg-hero-sections">
        <div>
          <h6 className="text-center mt-3">HOME - ABOUT</h6>
          <h1 className="text-center text-white">Account</h1>
        </div>
      </div>
      <div>
        {/* Nested routes will render here */}
        <Outlet />
      </div>
    </>
  );
}

export default Account;
