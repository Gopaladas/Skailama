import mongoose from "mongoose";

const youtubeLinks = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const ProjectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    youtubeLinks: [youtubeLinks],
  },
  { timestamps: true }
);

ProjectSchema.virtual("count").get(function () {
  return this.youtubeLinks.length;
});

ProjectSchema.set("toJSON", { virtuals: true });
ProjectSchema.set("toObject", { virtuals: true });

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
