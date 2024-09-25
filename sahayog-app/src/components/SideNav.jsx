// src/components/Sidebar.jsx
import React from "react";
import Alert from "../assets/warning.png"
import Report from "../assets/list.png"
import Map from "../assets/india.png"
import User from "../assets/user.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside
      className="bg-customGray text-black w-64 flex flex-col space-y-4 py-6 items-center justify-between"
      style={{ height: "calc(100vh - 60px)" }}
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center gap-12">
        <div className="flex items-center space-x-4 px-6">
          <img
            src={User} // Replace with actual profile picture path
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-gray-300"
          />
          <div>
            <p className="text-md font-bold text-gray-800">NDRF Coordinator</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-4 px-6 gap-3">
          <Link to="/dashboard">
            <div className="py-2 px-6 text-md hover:bg-gray-700 transition-colors duration-200 flex gap-3 bg-gray-400 rounded-2xl text-white font- items-center">
              <img src={Alert} className="h-7" />
              Alert Overview
            </div>
            </Link>
         
          <a href="#latestReport">
            <div className="py-2 px-6 text-md hover:bg-gray-700 transition-colors duration-200 flex gap-3 bg-gray-400 rounded-2xl text-white font- items-center">
              <img src={Report} className="h-7" />
               Report
            </div>
          </a>
          <Link to="/dashboard/map">
            <div className="py-2 px-6 text-md hover:bg-gray-700 transition-colors duration-200 flex gap-3 bg-gray-400 rounded-2xl text-white font- items-center">
              <img src={Map} className="h-7" />
              Map Overview
            </div>
          </Link>
        </nav>
      </div>

      {/* Log Out Button */}
      <div className="mt-auto px-6">
        <button className="bg-red-500 py-2 px-6 w-full text-white text-left hover:bg-red-600 shadow-md rounded-sm">
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
