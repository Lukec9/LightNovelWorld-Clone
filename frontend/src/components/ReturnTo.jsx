import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useLastVisitedPage = () => {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("lastVisited", location.pathname);
  }, [location]);
};

const ReturnToPrevious = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    const lastVisited = localStorage.getItem("lastVisited");
    if (lastVisited) {
      navigate(lastVisited);
    } else {
      navigate(-1);
    }
  };

  return (
    <button onClick={handleReturn} className="return-button button">
      Return to Last Visited
    </button>
  );
};

export default ReturnToPrevious;
