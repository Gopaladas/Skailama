import React, { useState } from "react";
import "./Overlay.css";
import axios from "axios";
import { projectApi } from "../../mainApi";
import { useNavigate } from "react-router-dom";

const Overlay = ({ handleClose, onProjectCreated }) => {
  const [projectName, setProjectName] = useState("");
  const handleCancel = () => {
    handleClose(false);
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      projectName: projectName,
    };

    try {
      const res = await axios.post(`${projectApi}/add-project`, data, {
        withCredentials: true,
      });

      console.log(res);
      if (res.data.success) {
        handleCancel();
        if (typeof onProjectCreated === "function") {
          onProjectCreated();
        }
        navigate("/projects");
      }
    } catch (error) {
      console.log("error :: ", error);
    }
  };
  return (
    <div className="Overlay-section">
      <div className="overlay-form">
        <p className="overlay-heading">Create Project</p>
        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <label className="label">Enter Project Name</label>
            <input
              type="text"
              name="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Type here"
            />
            {projectName === null ? (
              <p className="display-warning">project name can't be empty</p>
            ) : (
              ""
            )}
            <div className="foot-form">
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                cancel
              </button>
              <button type="submit" className="submit-btn">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Overlay;
