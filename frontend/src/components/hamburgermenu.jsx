import { useEffect } from "react";

const HamburgerMenu = () => {
  useEffect(() => {
    // Select elements

    const hamburger = document.querySelector(".hamburger");
    const navBar = document.querySelector(".nav-bar");
    const body = document.querySelector("body");
    const overlay = document.querySelector(".sidebar-wrapper");

    // Ensure elements are available before adding event listeners
    const handleHamburgerClick = () => {
      hamburger.classList.toggle("active");
      navBar.classList.toggle("active");
      overlay.classList.toggle("show");
      body.classList.toggle("bodyactive");
    };

    // Add event listeners
    hamburger.addEventListener("click", handleHamburgerClick);

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navBar.classList.remove("active");
        overlay.classList.remove("show");
        body.classList.remove("bodyactive");
      });
    });

    // Cleanup function to remove event listeners
    return () => {
      if (hamburger) {
        hamburger.removeEventListener("click", handleHamburgerClick);
      }
      document.querySelectorAll(".nav-link").forEach(link => {
        link.removeEventListener("click", () => {});
      });
    };
  }, []);

  return (
    <div className="hamburger">
      <span className="bar"> </span>
      <span className="bar"> </span>
      <span className="bar"> </span>
    </div>
  );
};

export default HamburgerMenu;
