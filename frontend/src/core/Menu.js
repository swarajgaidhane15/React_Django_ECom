import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#2ecc72",
      border: "1px solid #2ecc72",
    };
  } else {
    return { color: "#fff" };
  }
};

const Menu = ({ history, path }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link style={currentTab(history, "/")} to="/" className="nav-link">
            Home
          </Link>
        </li>
        {isAuthenticated() && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/dashboard")}
              to="/dashboard"
              className="nav-link"
            >
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/cart")}
              to="/cart"
              className="nav-link"
            >
              Cart
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signup")}
                to="/signup"
                className="nav-link"
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signin")}
                to="/signin"
                className="nav-link"
              >
                Login
              </Link>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              Logout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
