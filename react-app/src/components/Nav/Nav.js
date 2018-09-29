import React from "react";
import "./Jumbotron.css";

const Nav = ({ children }) => (
  <div className="jumbotron">
    {children}
  </div>
);

export default Nav;