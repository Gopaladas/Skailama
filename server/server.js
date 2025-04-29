import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import dotenv from "dotenv";
import authRoute from "./routes/authRoutes.js";
import projectRoute from "./routes/projectRoutes.js";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "https://skailama-j9gk.vercel.app",
    methods: ["GET", "PUT", "POST", "OPTIONS", "DELETE", "UPDATE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
connectDB();
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/api/authUser", authRoute);
app.use("/api/project", projectRoute);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running at port :: ${PORT}`);
});
