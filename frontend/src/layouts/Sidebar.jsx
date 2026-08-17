import React from "react";
import { List, PersonCircle } from "react-bootstrap-icons";

/**
 * Top navbar: brand + sidebar toggle on the left, account menu on the right.
 */
export default function Header({ brand = "Spoken English-I", onToggleSidebar }) {
  return (
    <nav className="navbar navbar-dark bg-dark px-3 header-bar">
      <div className="d-flex align-items-center gap-3">
        <button
          className="btn btn-dark border-0 p-1"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <List size={22} />
        </button>
        <span className="navbar-brand mb-0 fw-semibold">{brand}</span>
      </div>

      <div className="dropdown">
        <button
          className="btn btn-dark border-0 dropdown-toggle d-flex align-items-center"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <PersonCircle size={22} />
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li><a className="dropdown-item" href="#profile">Profile</a></li>
          <li><a className="dropdown-item" href="#logout">Logout</a></li>
        </ul>
      </div>
    </nav>
  );
}