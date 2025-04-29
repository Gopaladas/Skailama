import React, { useEffect, useState } from "react";
import uploadIcon from "../../assets/upload.png";
import youtubeIcon from "../../assets/youtube.png";
import rssIcon from "../../assets/upload_wifi.png";
import Icon from "../../assets/Icon.png";
import { useNavigate, useOutletContext } from "react-router-dom";
import Feed from "../Feed/Feed";
import { projectApi } from "../../mainApi";
import axios from "axios";

const PodCast = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState();

  const { projectId } = useOutletContext();
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const fetchData = async (req, res) => {
    try {
      const res = await axios.get(`${projectApi}/data/${projectId}`, {
        withCredentials: true,
      });

      console.log(res.data);
      if (res.data.success) {
        console.log("hi");
        setData(res?.data?.project);
        return res?.data?.project;
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

  const handleDelete = async (id) => {
    const newData = {
      projectId: projectId,
      linkId: id,
    };
    try {
      const res = await axios.post(`${projectApi}/delete`, newData, {
        withCredentials: true,
      });
      console.log(res.data.success);
      if (res.data.success) {
        const newdata = await fetchData();
        setData(newdata);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <h1>Add Podcast</h1>

        <div className="card-row">
          <div className="source-card">
            <img src={rssIcon} alt="RSS" />
            <h4>RSS Feed</h4>
            <p>Lorem ipsum dolor sit. Dolor lorem sit.</p>
          </div>
          <button type="button" className="youtube-btn" onClick={handleShow}>
            <div className="source-card">
              <img src={youtubeIcon} alt="YouTube" />
              <h4>Youtube Video</h4>
              <p>Lorem ipsum dolor sit. Dolor lorem sit.</p>
            </div>
          </button>
          <div className="source-card">
            <img src={uploadIcon} alt="Upload" />
            <h4>Upload Files</h4>
            <p>Lorem ipsum dolor sit. Dolor lorem sit.</p>
          </div>
        </div>

        {console.log(data)}
        {data?.youtubeLinks.length > 0 ? (
          <div className="display-list">
            <div className="file-list-container">
              <h2>Your Files</h2>
              <table className="file-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Upload Date & Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.youtubeLinks?.map((file, index) => {
                    const formatDate = (dateString) => {
                      const date = new Date(dateString);
                      const formattedDate = date.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      });
                      const formattedTime = date.toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      });
                      return `${formattedDate} | ${formattedTime}`;
                    };

                    return (
                      <tr key={file?._id}>
                        <td>{index + 1}</td>
                        <td>{file?.name}</td>
                        <td>{formatDate(file?.createdAt)}</td>
                        <td>
                          <button
                            className="action-btn view-btn"
                            onClick={() =>
                              navigate(`/project/${projectId}/edit/${file._id}`)
                            }
                          >
                            View
                          </button>
                          <button
                            className="action-btn delete-btn"
                            onClick={() => handleDelete(file._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="upload-area">
            <div className="upload-box">
              <img src={uploadIcon} alt="Upload Icon" className="upload-icon" />
              <p>Select a file or drag and drop here</p>
              <p className="file-types">
                MP4, MOV, MP3, WAV, PDF, DOCX or TXT file
              </p>
              <button className="select-btn">Select File</button>
            </div>
          </div>
        )}
      </div>
      {show && (
        <Feed
          handleClose={handleClose}
          onProjectCreated={handleprojectCreated}
          id={projectId}
        />
      )}
    </>
  );
};

export default PodCast;
