import React from "react";
import bend from "../../assets/bend.png";
import circle from "../../assets/circle.png";
import settings from "../../assets/icon.png";
import notifications from "../../assets/notifications.png";

import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="nav-main-section">
      <div className="img-right-section-nav">
        <div>
          <img src={circle} className="right-img-nav" alt="Circle icon" />
          <img src={bend} className="right-img1-nav" alt="Bend icon" />
        </div>
        <div className="text-right-section-nav">
          <p className="right-act-text-nav">
            <span className="right-sub-text-nav">
              <span>Ques.</span>AI
            </span>
          </p>
        </div>
      </div>

      <div className="icons-section">
        <div>
          <a href="#">
            <img src={settings} alt="settings icon" className="icon" />
          </a>
        </div>
        <div>
          <a href="#">
            <img
              src={notifications}
              alt="notifications icon"
              className="icon"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
