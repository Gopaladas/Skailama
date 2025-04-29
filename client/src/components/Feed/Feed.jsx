import React, { useState } from "react";
import "./Feed.css";
import axios from "axios";
import { projectApi } from "../../mainApi";
import { useNavigate } from "react-router-dom";

const Feed = ({ handleClose, onProjectCreated, id }) => {
  const [data, setData] = useState({
    name: "",
    text: "",
  });
  const handleCancel = () => {
    handleClose(false);
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${projectApi}/update-project/${id}`, data, {
        withCredentials: true,
      });

      console.log(res);
      if (res.data.success) {
        handleCancel();
        if (typeof onProjectCreated === "function") {
          onProjectCreated();
        }
        navigate(`/project/${id}`);
      }
    } catch (error) {
      console.log("error :: ", error);
    }
  };
  return (
    <div className="Feed-section">
      <div className="Feed-form">
        <p className="overlay-heading">Create Project</p>
        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              placeholder="Type here"
            />
            <label className="label">Transcription</label>
            <input
              type="text"
              name="text"
              value={data.text}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              placeholder="Type here"
            />
            {data.name === null ? (
              <p className="display-warning">project name can't be empty</p>
            ) : (
              ""
            )}
            <div className="foot-form">
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
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

export default Feed;
