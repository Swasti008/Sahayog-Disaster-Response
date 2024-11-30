// src/App.js
import React, { useState, useEffect } from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import Sidebar, { SidebarItem } from "../components/SideNav";
import Dashboard from "../components/Dahboard";
import InteractiveMap from "../components/InterativeMap";
import { Home, Bell, MapPin, User } from "lucide-react";
import { Typography } from "@mui/material";
import io from "socket.io-client";
import FetchData from "../components/services/FetchData";

const socket = io("http://localhost:3000"); // Connect to the server

const MainDash = () => {
  const [alerts, setAlerts] = useState([]);
  const [activeItem, setActiveItem] = useState("dashboard"); // Track active sidebar item
  const location = useLocation(); // To track route changes

  useEffect(() => {
    const fetchData = async () => {
      const result = await FetchData();
      setAlerts(result);
    };

    fetchData();

    // Listen for the 'newEntry' event from the server
    socket.on("newEntry", (data) => {
      console.log("Received new entry: ", data);
      setAlerts((prevAlerts) => [...prevAlerts, { ...data, color: "orange" }]); // Add the new alert to the top
    });

    // Cleanup the effect when the component unmounts
    return () => {
      socket.off("newEntry");
    };
  }, []);

  // Set active item based on route change
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setActiveItem("dashboard");
    } else if (location.pathname === "/dashboard/map") {
      setActiveItem("map");
    } else if (location.pathname === "/dashboard/alerts") {
      setActiveItem("alerts");
    } else if (location.pathname === "/dashboard/profile") {
      setActiveItem("profile");
    } else if (location.pathname == "/") {
      setActiveItem("home")
    }
  }, [location]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-1">
          <Sidebar className="w-64 bg-gray-200 shadow-2xl">
            {/* Dashboard Sidebar Item */}

            <Link to="/">
              <SidebarItem
                icon={<Home size={20} />}
                text="Home"
                active={activeItem === "home"}
                alert={false}
                onClick={() => setActiveItem("home")}
              />
            </Link>

            <Link to="/dashboard">
              <SidebarItem
                icon={<Home size={20} />}
                text="Dashboard"
                active={activeItem === "dashboard"}
                alert={false}
                onClick={() => setActiveItem("dashboard")}
              />
            </Link>

            {/* Alerts Sidebar Item */}
            <a
              href="#latestReport"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#latestReport").scrollIntoView({ behavior: "smooth" });
              }}
            >
              <SidebarItem
                icon={<Bell size={24} />}
                text="Alerts"
                active={activeItem === "alerts"}
                alert={true}
                onClick={() => setActiveItem("alerts")}
              />
            </a>

            {/* Map Overview Sidebar Item */}
            <Link to="/dashboard/map">
              <SidebarItem
                icon={<MapPin size={20} />}
                text="Map Overview"
                active={activeItem === "map"}
                alert={false}
                onClick={() => setActiveItem("map")}
              />
            </Link>
          </Sidebar>

          {/* Main content */}
          <main
            className="flex-1 p- bg-gray-100 w-[60%]"
            style={{ height: "calc(100vh - 0px)", overflowY: "scroll" }}
          >
            <Routes>
              <Route path="/" element={<Dashboard alerts={alerts} />} />
              <Route
                path="/map"
                element={
                  <>
                    <div className="px-4 py-5">
                      <Typography variant="h5">Map Overview</Typography>
                      <hr />
                    </div>
                    <InteractiveMap disasters={alerts} />
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
