import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="nav-bar">
      <NavLink to="/">
        <button id="home" className="navButton">
          Home 🐈
        </button>
      </NavLink>
      <NavLink to="/cats">
        <button id="cats" className="navButton">
          Cats 😻
        </button>
      </NavLink>
    </div>
  );
}

export default Navbar;
