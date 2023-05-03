import React, { Fragment } from "react";

const NavBar = ({ title, subtitle }) => {
  return (
    <Fragment>
      <header>
        <div className="navbar">
          <div className="navbar-brand">{title}</div>
          <div className="navbar-links">
          </div>
          <button className="navbar-button">Sign In</button>
        </div>
      </header>
    </Fragment>
  );
};

export default NavBar;
