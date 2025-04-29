import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import group from "../../assets/group.png";
import Frame from "../../assets/Frame.png";
import "./Home.css";
import Overlay from "../Overlay/Overlay";
const Home = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };
  return (
    <div>
      <Navbar />
      <div className="main-home-section">
        <div className="main-sub">
          <p className="main-home-heading">Create a New Project</p>
          <img src={group} className="group-img" alt="Group-icon" />
          <p className="sub-para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor, nisl eget ultricies tincidunt. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam auctor, nisl eget ultricies
            tincidunt.
          </p>
          <button className="project-btn" onClick={handleShow}>
            <img src={Frame} className="frame" />
          </button>
        </div>
      </div>

      {show && <Overlay handleClose={handleClose} />}
    </div>
  );
};

export default Home;
