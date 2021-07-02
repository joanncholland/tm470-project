import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/UserAuthContext";
import "./Navbar.scss";

export default function Navbar() {
  const { currentUser } = useAuth();
  const [responsiveMenu, setResponsiveMenu] = useState(false);

  function toggleMenu() {
    setResponsiveMenu(!responsiveMenu);
  }

  if (currentUser) {
    return (
      <nav>
        <p id="logo">
          <Link to="/">MyGarden</Link>
        </p>
        <ul className={responsiveMenu ? "nav-links nav-open" : "nav-links"}>
          <li>
            <NavLink activeClassName="link-active" to="/dashboard">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="link-active" to="/garden-planner">
              Garden Planner
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="link-active" to="/task-list">
              Task List
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="link-active" to="/crop-index">
              Crop Index
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="link-active" to="/support">
              Support
            </NavLink>
          </li>
          <li>
            <Link to="/update-profile">
              <button>My Profile</button>
            </Link>
          </li>
        </ul>

        <div className="responsive-menu" onClick={toggleMenu}>
          MENU
        </div>
      </nav>
    );
  } else {
    return (
      <nav>
        <p>
          <Link to="/">MyGarden</Link>
        </p>
        <ul></ul>
        <button>
          <Link to="/login">Log in</Link>
        </button>
      </nav>
    );
  }
}
