import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container">
      <div className="white-boxed">
        <h1>Page Not Found</h1>
        <p>We can't seem to find the page you're looking for.</p>
        <p>
          Some novel pages moved for better user experience. Could be affected
          by this situation.
        </p>
        <p>
          Please use the search function for the content you want to access or
          go to home page and start exploring the light novels.
        </p>
        <hr />
        <div className="mt-2">
          <Link className="button" to="/search" role="button">
            Start Search
          </Link>
          <Link className="button" to="/" role="button">
            Go Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
