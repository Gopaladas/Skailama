import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Add from "../../assets/add.png";
import diamond from "../../assets/diamond.png";
import copy from "../../assets/copy.png";
import pen from "../../assets/pen.png";
import uploadIcon from "../../assets/upload.png";
import youtubeIcon from "../../assets/youtube.png";
import rssIcon from "../../assets/upload_wifi.png";
import Icon from "../../assets/Icon.png";
import "./Projectdetails.css";
import { projectApi } from "../../mainApi";
import axios from "axios";
import { useSelector } from "react-redux";
import Feed from "../Feed/Feed";

import { Outlet } from "react-router-dom";
import Breadcrumbs from "../BreadCrumbs/BreadCrumbs";

const Projectdetails = () => {
  const { userData } = useSelector((state) => state.auth);
  const { projectId } = useParams();

  const navigate = useNavigate();

  return (
    <div className="project-container">
      <div className="sidebar">
        <div>
          <img src={Logo} alt="Logo" className="logo" />
          <ul className="nav-links">
            <li>
              <NavLink
                to={`/project/${projectId}`}
                className={({ isActive }) =>
                  isActive ? "link active-Link" : "link normal-link"
                }
              >
                <img src={Add} alt="Add" />
                <span>Add your Podcast(s)</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  isActive ? "link active-Link" : "link normal-link"
                }
              >
                <img src={pen} alt="Pen" />
                <span>Create & Repurpose</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/podcast"
                className={({ isActive }) =>
                  isActive ? "link active-Link" : "link normal-link"
                }
              >
                <img src={copy} alt="Copy" />
                <span>Podcast Widget</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/upgrade"
                className={({ isActive }) =>
                  isActive ? "link active-Link" : "link normal-link"
                }
              >
                <img src={diamond} alt="Upgrade" />
                <span>Upgrade</span>
              </NavLink>
            </li>
          </ul>
          <div className="line"></div>
        </div>
        <div>
          <div>
            <div className="help">
              <img src={Icon} className="settings-logo" /> <p>Help</p>
            </div>
            <div className="line"></div>
          </div>
          <div>
            <div className="user-box">
              <div className="sub-user-box"></div>
              <Link to="/profile">
                <div>
                  <p className="text-userData big-text">{userData.name}</p>
                  <p className="text-userData">{userData.email}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content">
        <Breadcrumbs />

        <Outlet context={{ projectId }} />
      </div>
    </div>
  );
};

export default Projectdetails;
