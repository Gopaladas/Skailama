import React, { useState, useEffect } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";
import { projectApi } from "../../mainApi";
import "./Edit.css";

const Edit = () => {
  const { episodeId } = useParams();
  const { data, projectId } = useOutletContext();
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState("");
  const [originalTranscript, setOriginalTranscript] = useState("");
  const [activeTab, setActiveTab] = useState("transcript");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [loadedData, setLoadedData] = useState("");

  useEffect(() => {
    const fetchEpisodeData = async () => {
      const newdata = {
        projectId,
        episodeId,
      };
      try {
        const response = await axios.post(`${projectApi}/get-text`, newdata, {
          withCredentials: true,
        });
        console.log("Hi", response?.data?.youtubeLink);
        if (response.data.success) {
          console.log(response.data.youtubeLink.description);
          setLoadedData(response?.data?.youtubeLink);
          setTranscript(response.data?.youtubeLink?.description || "");
          setOriginalTranscript(response?.data?.youtubeLink?.description || "");
        }
      } catch (err) {
        console.error("Error fetching episode:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEpisodeData();
  }, [episodeId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const newdata = {
      linkId: episodeId,

      projectId: projectId,
      name: loadedData.name,
      text: transcript,
    };
    console.log(newdata);
    try {
      const res = await axios.post(`${projectApi}/update-text`, newdata, {
        withCredentials: true,
      });
      console.log(res);
      setOriginalTranscript(transcript);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating transcript:", error);
    }
  };

  const handleDiscard = () => {
    setTranscript(originalTranscript);
    setIsEditing(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) return <div>Loading episode data...</div>;

  return (
    <div className="transcript-editor-container">
      <div className="main-content">
        <div className="content-header">
          <div className="header-top-row">
            <button onClick={handleBack} className="back-button">
              Back
            </button>
            <h2>Edit Transcript</h2>
            {isEditing ? (
              <div className="edit-controls">
                <button onClick={handleDiscard} className="discard-btn">
                  Discard
                </button>
                <button onClick={handleSave} className="save-btn">
                  Save
                </button>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                Edit
              </button>
            )}
          </div>

          <div className="tab-controls">
            <button
              className={`tab-btn ${
                activeTab === "transcript" ? "active" : ""
              }`}
              onClick={() => setActiveTab("transcript")}
            >
              Transcript
            </button>
          </div>
        </div>

        {activeTab === "transcript" ? (
          <div className="transcript-content">
            <div className="speaker-label">Speaker</div>
            <textarea
              className="transcript-text"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              spellCheck="false"
              readOnly={!isEditing}
            />
          </div>
        ) : (
          <div className="navigator-content">
            <p>Navigator content goes here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Edit;
