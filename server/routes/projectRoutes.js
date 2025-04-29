import express from "express";
import {
  addData,
  createProject,
  deleteText,
  getEpisode,
  getProjectData,
  getProjects,
  updateText,
} from "../controllers/project.js";
import auth from "../middleware/auth.js";

const projectRoute = express.Router();

projectRoute.post("/add-project", auth, createProject);
projectRoute.post("/update-project/:projectId", auth, addData);
projectRoute.post("/update-text", auth, updateText);
projectRoute.post("/delete", auth, deleteText);
projectRoute.get("/data/:projectId", auth, getProjectData);
projectRoute.get("/projects-data", auth, getProjects);
projectRoute.post("/get-text", auth, getEpisode);
export default projectRoute;
