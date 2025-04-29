import User from "../models/userSchema.js";
import Project from "../models/projectSchema.js";
import mongoose from "mongoose";

const createProject = async (req, res) => {
  const { projectName } = req.body;
  const userId = req.userId;

  if (!projectName) {
    return res.json({ success: false, message: "Enter project Name" });
  }

  try {
    const project = await Project.findOne({ projectName });

    if (project) {
      return res.json({
        success: false,
        message: "Already project is exist with same name",
      });
    }

    const newProject = new Project({
      user: userId,
      projectName: projectName,
    });

    await newProject.save();

    return res.json({
      success: true,
      message: "Successfully added",
      newProject,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const addData = async (req, res) => {
  const { name, text } = req.body;
  const { projectId } = req.params;
  // console.log(projectId,name,text);
  if (!name || !text || !projectId) {
    return res.json({ success: false, message: "Enter all fields" });
  }

  try {
    const project = await Project.findById({ _id: projectId });
    // console.log(project);
    if (!project) {
      return res.json({ success: false, message: "Project not found" });
    }

    project.youtubeLinks.push({
      name: name,
      description: text,
      createdAt: Date.now(),
    });

    await project.save();

    return res.json({ success: true, message: "successfully added", project });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const updateText = async (req, res) => {
  const { projectId, linkId, name, text } = req.body;
  console.log(projectId, linkId, name, text);

  if (!projectId || !linkId || !name || !text) {
    return res.json({ success: false, message: "enter all the fields" });
  }

  try {
    const project = await Project.findById({ _id: projectId });

    if (!project) {
      return res.json({ success: false, message: "project doesnt exist" });
    }

    const link = await Project.findOneAndUpdate(
      {
        _id: projectId,
        "youtubeLinks._id": linkId,
      },
      {
        $set: {
          "youtubeLinks.$.name": name,
          "youtubeLinks.$.description": text,
        },
      },
      { new: true }
    );

    if (!link) {
      return res.json({ success: false, message: "faild to update" });
    }

    return res.json({ success: true, message: "updated successfully", link });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const deleteText = async (req, res) => {
  const { projectId, linkId } = req.body;

  if (!projectId || !linkId) {
    return res.json({ success: false, message: "not found" });
  }

  try {
    const project = await Project.findById({ _id: projectId });

    if (!project) {
      return res.json({ success: false, message: "Project not found" });
    }

    const deleteProject = await Project.findByIdAndUpdate(
      {
        _id: projectId,
      },
      {
        $pull: { youtubeLinks: { _id: linkId } },
      },
      { new: true }
    );

    if (!deleteProject) {
      return res.json({ success: false, message: "failed to delete" });
    }

    return res.json({
      success: true,
      message: "successfully deleted",
      deleteProject,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const data = await Project.find();

    if (!data) {
      return res.json({ success: false, message: "Data not found" });
    }

    return res.json({ success: true, data });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getProjectData = async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    return res.json({ success: false, message: "Project is not found" });
  }

  try {
    const project = await Project.findById({ _id: projectId });

    if (!project) {
      return res.json({ success: false, message: "Data not found" });
    }

    return res.json({ success: true, project });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getEpisode = async (req, res) => {
  try {
    const { projectId, episodeId } = req.body;
    console.log(projectId, episodeId);

    // Validate MongoDB IDs
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID format",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(episodeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid YouTube link ID format",
      });
    }

    // Find the project containing the YouTube link
    const project = await Project.findOne({
      _id: projectId,
      "youtubeLinks._id": episodeId,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found or doesn't contain the specified YouTube link",
      });
    }

    // Find the specific YouTube link using Mongoose's subdocument id() method
    const youtubeLink = project.youtubeLinks.id(episodeId);

    if (!youtubeLink) {
      return res.status(404).json({
        success: false,
        message: "YouTube link not found in project",
      });
    }

    // console.log(youtubeLink);
    res.json({
      success: true,
      youtubeLink: {
        id: youtubeLink._id,
        name: youtubeLink.name,
        description: youtubeLink.description,
        createdAt: youtubeLink.createdAt,
        projectId: project._id,
        projectName: project.projectName,
      },
    });
  } catch (error) {
    console.error("Error fetching YouTube link:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching YouTube link",
    });
  }
};

export {
  createProject,
  addData,
  updateText,
  deleteText,
  getProjectData,
  getProjects,
  getEpisode,
};
