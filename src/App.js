import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registrasi from "./pages/Registrasi";
import TopUp from "./pages/TopUp";
import ListrikPrabayar from "./pages/ListrikPrabayar";
import Transaction from "./pages/Transaction";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

const App = () => {
  return (
    <div className="overflow-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrasi" element={<Registrasi />} />
          <Route path="/pulsa" element={<TopUp />} />
          <Route path="/pln" element={<ListrikPrabayar />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
