import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import Navbar from "./components/Navbar/Navbar";

import { useSelector } from "react-redux";
import Home from "./components/Home/Home";
import Project from "./components/Projects/Project";
import Projectdetails from "./components/Project/Projectdetails";
import Edit from "./components/Edit/Edit";
import PodCast from "./components/PodCast/PodCast";
const App = () => {
  const { useData, isLoggedIn } = useSelector((state) => state.auth);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/project/:projectId" element={<Projectdetails />}>
          <Route index element={<PodCast/>}/>
          <Route path="edit/:episodeId" element={<Edit />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
