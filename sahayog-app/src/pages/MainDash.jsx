// src/App.js
import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Sidebar, { SidebarItem } from "../components/SideNav";
import Dashboard from "../components/Dahboard";
import InteractiveMap from "../components/InterativeMap";
import { Home, Bell, MapPin, ClipboardPenLine, LayoutDashboard } from "lucide-react";
import { Typography } from "@mui/material";
import io from "socket.io-client";
import FetchData from "../components/services/FetchData";
import DetailedReports from "../components/DetailedReports";

const socket = io("http://localhost:3000");

const MainDash = () => {
  const [alerts, setAlerts] = useState([]);
  const [activeItem, setActiveItem] = useState("dashboard"); 
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await FetchData();
      setAlerts(result);
    };

    fetchData();

    socket.on("newEntry", (data) => {
      console.log("Received new entry: ", data);
      setAlerts((prevAlerts) => [...prevAlerts, { ...data, color: "orange" }]); 
    });

    return () => {
      socket.off("newEntry");
    };
  }, []);

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
      setActiveItem("home");
    } else if (location.pathname == "/dashboard/reports") {
      setActiveItem("detailed");
    }
  }, [location]);

  const handleAlertsClick = () => {
    if (location.pathname !== "/dashboard") {
      navigate("/dashboard"); 
    }
    setTimeout(() => {
      const reportElement = document.querySelector("#latestReport");
      if (reportElement) {
        reportElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); 
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-1">
          <Sidebar className="w-64 bg-gray-200 shadow-2xl">
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
                icon={<LayoutDashboard size={20} />}
                text="Dashboard"
                active={activeItem === "dashboard"}
                alert={false}
                onClick={() => setActiveItem("dashboard")}
              />
            </Link>

            <Link to="/dashboard/reports">
              <SidebarItem
                icon={<ClipboardPenLine size={20} />}
                text="Track Reports"
                active={activeItem === "detailed"}
                alert={false}
                onClick={() => setActiveItem("detailed")}
              />
            </Link>

            <button onClick={handleAlertsClick} className="w-full text-left">
              <SidebarItem
                icon={<Bell size={24} />}
                text="Alerts"
                active={activeItem === "alerts"}
                alert={true}
                onClick={() => setActiveItem("alerts")}
              />
            </button>

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
            className="flex-1 p- bg-gray-100 w-[100%]"
            style={{ height: "calc(100vh - 0px)", overflowY: "scroll" }}
          >
            <Routes>
              <Route path="/" element={<Dashboard alerts={alerts} />} />
              <Route
                path="/map"
                element={
                  <>
                    <InteractiveMap disasters={alerts} />
                  </>
                }
              />
              <Route path="/reports" element={<DetailedReports />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default MainDash;
