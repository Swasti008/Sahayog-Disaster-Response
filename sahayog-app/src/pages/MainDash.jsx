// src/App.js
import React from "react";
import Header from "../components/TopHeader";
import Sidebar from "../components/SideNav";
import Dashboard from "../components/Dahboard";
import InteractiveMap from "../components/InterativeMap";
import { Route, Routes } from "react-router-dom";
import { Typography } from "@mui/material";
import io from "socket.io-client";
import { useState,useEffect } from "react";
import FetchData from "../components/services/FetchData";

const socket = io("http://localhost:3000"); // Connect to the server

const MainDash = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await FetchData();
      console.log(result);
      setAlerts(result);
    };

    fetchData();

    // Listen for the 'newEntry' event from the server
    socket.on("newEntry", (data) => {
      console.log("Received new entry: ", data);
      // You can update the state with new data if necessary
      setAlerts((prevAlerts) => [...prevAlerts, { ...data, color: "orange" }]); // Add the new alert to the top
    });

    // Cleanup the effect when the component unmounts
    return () => {
      socket.off("newEntry");
    };
  }, []);
  return (
    <>
      <div className="flex flex-col">
        {/* Header */}
        <Header />

        {/* Content wrapper */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar className="w-64 bg-gray-200 shadow-2xl " />

          {/* Main content */}
          <main
            className="flex-1 p-4 bg-gray-100 w-[60%]"
            style={{ height: "calc(100vh - 60px)", overflow: "scroll" }}
          >
            <Routes>
              <Route path="/" element={<Dashboard alerts={alerts}/>} />
              <Route
                path="/map"
                element={
                  <>
                    <div className="px-4 py-5">
                      <Typography variant="h5">Map Overview</Typography>
                      <hr></hr>
                    </div>
                    <InteractiveMap disasters={alerts}/>

                  </>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default MainDash;
