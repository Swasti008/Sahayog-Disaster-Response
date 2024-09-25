import React, { useState, useEffect } from "react";
import "../css/Dashboard.css";
import PieChart from "./PieChart";
import CardComponent from "./cardComponent";
import SearchBar from "./SearchBar";
import { Typography } from "@mui/material";
import moment from "moment";

const Dashboard = ({ alerts }) => {
  return (
    <div className="p-6">
      <section id="AlertOverview">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold">Alert Overview</h1>
        </div>
        {/* Main Flex Container for Alert Overview and PieChart */}
        <div className="flex flex-col md:flex-row">
          {/* Alert Overview & Recent Alerts */}
          <div className="flex-1 w-[20%]">
            {/* Alert Overview */}
            <div className="flex flex-row items-start gap-8 mb-4">
              <div className="text-red-600 font-bold bg-red-100 p-6 rounded-lg shadow-lg w-64">
                <span className="flex items-center gap-3">
                  <div className="bg-red-500 h-2 w-2 rounded-full"></div>
                  <h2 className="text-lg font-semibold">Critical Alerts</h2>
                </span>
                <p className="text-xl"> &nbsp; &nbsp; 2</p>
              </div>
              <div className="text-yellow-600 font-bold bg-orange-100 p-6 rounded-lg shadow-lg w-64">
                <span className="flex gap-3 items-center">
                  <div className="bg-yellow-500 rounded-full h-2 w-2"></div>
                  <h2 className="text-lg font-semibold">Moderate Alerts</h2>
                </span>
                <p className="text-xl"> &nbsp; &nbsp; 5</p>
              </div>
              <div className="text-green-500 font-bold bg-green-100 p-6 rounded-lg shadow-lg w-64">
                <span className="flex items-center gap-4">
                  <div className="bg-green-500 rounded-full h-2 w-2"></div>
                  <h2 className="text-lg font-semibold">Low Alerts</h2>
                </span>
                <p className="text-xl"> &nbsp; &nbsp; 2</p>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="recent-alerts mb-4 mt-4">
              <h1 className="text-xl font-semibold mb-4">Recent Alerts</h1>
              <div className="marquee">
                <div className="alerts-container">
                  {alerts.map((alert, index) => (
                    <div
                      className={`alert-item ${
                        alert.color ? "bg-orange-800" : "bg-blue-600"
                      }`} // Apply 'bg-blue-600' as a fallback if no color is defined
                      key={index}
                    >
                      <p className="location w-[full] overflow-hidden text-ellipsis whitespace-nowrap">
                        {alert.location?.city} {alert.location?.state}
                      </p>

                      <p className="">{alert?.type}</p>
                      <p className="text-xs text-gray-300">
                        {moment(alert?.timestamp).format("h:mm A")}{" "}
                        {moment(alert?.timestamp).format("DD/MMM/YYYY")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PieChart Section */}
          <div className="w-[20%]">
            <div>
              <PieChart />
              <Typography />
            </div>
          </div>
        </div>
      </section>
      <hr></hr>
      <section id="latestReport">
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold mb-4">Latest Reports</h2>
            <SearchBar className="ml-auto" />
          </div>
          <hr></hr>
          <p>No filter selected</p>
          <hr />
          <CardComponent data={alerts} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
