import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const guestLinks = (
    <ul>
      <li>
        <Link to="/users">All Users</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> Home Page
        </Link>
      </h1>
      <> {guestLinks}</>
      {/* {!loading && (<>{isAuthenticated ? authLinks : guestLinks}</>)} */}
    </nav>
  );
};

export default Navbar;
