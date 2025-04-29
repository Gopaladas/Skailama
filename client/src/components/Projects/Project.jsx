import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Frame from "../../assets/Frame.png";
import Overlay from "../Overlay/Overlay";
import "./Project.css";
import axios from "axios";
import { projectApi } from "../../mainApi";
import { useNavigate } from "react-router-dom";

const Project = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`${projectApi}/projects-data`, {
        withCredentials: true,
      });
      console.log(res.data.data);
      if (res.data.success) {
        setData(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleprojectCreated = async () => {
    const newdata = await fetchData();
    setData(newdata);
  };
  return (
    <>
      <Navbar />
      <div>
        <div className="main-project-section">
          <div className="pro-heading">
            <p className="project-heading">Projects</p>
          </div>
          <div className="pro-btn">
            <button className="project-btn" onClick={handleShow}>
              <img src={Frame} className="frame" />
            </button>
          </div>
        </div>
      </div>

      <div className="projects-grid">
        {data.map((project) => {
          const initials = project.projectName
            .split(" ")
            .slice(0, 2)
            .map((word) => word[0]?.toUpperCase() || "")
            .join("");

          const formatDate = (dateString) => {
            const now = new Date();
            const updated = new Date(dateString);
            const diffDays = Math.floor(
              (now - updated) / (1000 * 60 * 60 * 24)
            );
            if (diffDays === 0) return "today";
            if (diffDays === 1) return "yesterday";
            if (diffDays < 7) return `${diffDays} days ago`;
            if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
            return `${Math.floor(diffDays / 30)} months ago`;
          };

          return (
            <div
              key={project._id}
              className="project-card"
              onClick={() => navigate(`/project/${project._id}`)}
            >
              <div className="project-avatar">{initials}</div>
              <div className="project-info">
                <h3 className="project-name">{project.projectName}</h3>
                <div className="project-meta">
                  <span>{project.youtubeLinks.length} Files</span>
                  <span>•</span>
                  <span>Last edited {formatDate(project.updatedAt)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {show && (
        <Overlay
          handleClose={handleClose}
          onProjectCreated={handleprojectCreated}
        />
      )}
    </>
  );
};

export default Project;
