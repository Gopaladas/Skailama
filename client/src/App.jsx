import React from "react";
import { Routes, Route ,Navigate} from "react-router-dom";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";

import { useSelector } from "react-redux";
import Home from "./components/Home/Home";
import Project from "./components/Projects/Project";
import Projectdetails from "./components/Project/Projectdetails";
import Edit from "./components/Edit/Edit";
import PodCast from "./components/PodCast/PodCast";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./components/Register/Register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/project/:projectId" element={<Projectdetails />}>
          <Route index element={<PodCast />} />
          <Route path="edit/:episodeId" element={<Edit />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
