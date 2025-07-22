import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar({ isAuthenticated }) {
  return (
    <div className="main-box">
      <nav className="nav-bar">
        <div className="logo-box">
          <h3 className="logo">Notes.</h3>
        </div>
        <div className="comp-box">
          <ul className="links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link-active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link-active" : "nav-link"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Contact"
                className={({ isActive }) =>
                  isActive ? "nav-link-active" : "nav-link"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
          {isAuthenticated && (
            <div>
              <button>Login/Signup</button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
