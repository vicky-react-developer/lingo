import React from "react";
import "./NotFound.css";

function NotFound() {

  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="notfound-container">

      <div className="notfound-card">

        <div className="notfound-icon">
          🚫
        </div>

        <h1 className="notfound-code">404</h1>

        <h5 className="notfound-title">
          Page Not Found
        </h5>

        <p className="notfound-text">
          The page you are looking for does not exist or has been moved.
        </p>

        <button
          className="btn btn-primary notfound-btn"
          onClick={goHome}
        >
          Go Home
        </button>

      </div>

    </div>
  );
}

export default NotFound;