import React, { useState, useContext, createContext } from "react";
import Alert from "../assets/warning.png";
import Report from "../assets/list.png";
import Map from "../assets/india.png";
import User from "../assets/user.png";
import Logo from "../assets/Logo Black.png";
import { Link } from "react-router-dom";
import { MoreVertical, ChevronLast, ChevronFirst, HomeIcon, AlertCircle } from "lucide-react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  let closeTimer = null;
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(["3", "2", "1"]); // Countdown values
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLogout = () => {
    setShowPopup(true);
    let index = 0;

    const interval = setInterval(() => {
      if (index < countdown.length - 1) {
        setCurrentIndex(++index);
      } else {
        clearInterval(interval); // Clear the interval when done
      }
    }, 1000); // Change number every second

    // Redirect to home after countdown
    setTimeout(() => {
      window.location.href = "/"; // Replace with your home landing page route
    }, countdown.length * 1000); // Total time based on countdown length
  };

  const handleTooltipOpen = () => {
    if (expanded) {
      if (closeTimer) clearTimeout(closeTimer);
      setTooltipOpen(true);
    }
  };

  const handleTooltipClose = () => {
    closeTimer = setTimeout(() => {
      setTooltipOpen(false);
    }, 1000);
  };

  const handleImmediateClose = () => {
    if (closeTimer) clearTimeout(closeTimer);
    setTooltipOpen(false);
  };

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={Logo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-24" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <Grid item>
          <ClickAwayListener onClickAway={handleImmediateClose}>
            <div
              onMouseEnter={handleTooltipOpen}
              onMouseLeave={handleTooltipClose}
            >
              <Tooltip
                arrow
                open={tooltipOpen}
                title={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      padding: 4,
                      width: "18vw",
                      alignItems: "center",
                    }}
                  >
                    <p className="text-lg mb-2">Click to Logout</p>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleLogout}
                      style={{
                        backgroundColor: "#fa343e",
                        color: "white",
                        transition: "background-color 0.3s ease",
                        width: "inherit",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#c1272d")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#fa343e")
                      }
                    >
                      Logout
                    </Button>
                  </div>
                }
                PopperProps={{
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, 8],
                      },
                    },
                  ],
                }}
              >
                <div className="border-t flex p-3 shadow-lg box-border m-2 rounded-xl">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTondX9KIW_5SQ0uDP36-SOgoxE3tLYCFQb_A&s"
                    alt=""
                    className={`w-10 h-10 rounded-md ${
                      expanded ? "ml-3" : "mx-auto"
                    }`}
                  />
                  <div
                    className={`flex justify-between items-center overflow-hidden transition-all ${
                      expanded ? "w-44 ml-3" : "w-0"
                    }`}
                  >
                    <div className={`leading-4 ${expanded ? "" : "hidden"}`}>
                      <h4 className="font-semibold">NDRF Co-ordinator</h4>
                      <span className="text-xs text-gray-600">
                        NDRF@gmail.com
                      </span>
                    </div>
                  </div>
                </div>
              </Tooltip>
            </div>
          </ClickAwayListener>
        </Grid>
      </nav>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="bg-white w-96 rounded-xl shadow-2xl border border-gray-200 p-6 text-center transform transition-all duration-300 ease-in-out animate-fade-in">
          <div className="flex justify-center mb-4">
            <HomeIcon 
              className="text-blue-500 animate-bounce" 
              size={64} 
              strokeWidth={1.5}
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Redirecting to Home
          </h2>
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-blue-600 mr-2">
              {countdown[currentIndex]}
            </span>
            <span className="text-gray-600">seconds remaining</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ 
                width: `${((countdown.length - currentIndex) / countdown.length) * 100}%` 
              }}
            ></div>
          </div>
          <div className="flex items-center justify-center text-sm text-gray-500 space-x-2">
            <AlertCircle size={16} className="text-yellow-500" />
            <p>Please wait while you are being redirected</p>
          </div>
        </div>
      </div>
      )}
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`relative flex items-center py-4 px-5 my-2 font-medium rounded-lg cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      {/* Icon */}
      <div className="text-xl">{icon}</div>

      {/* Text */}
      <span
        className={`overflow-hidden transition-all text-lg font-semibold ${
          expanded ? "w-48 ml-4" : "w-0"
        }`}
      >
        {text}
      </span>

      {/* Alert Indicator */}
      {alert && (
        <div
          className={`absolute right-3 w-3 h-3 rounded-full bg-indigo-400 ${
            expanded ? "" : "top-4"
          }`}
        />
      )}

      {/* Tooltip for collapsed state */}
      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-3 py-2 ml-6 bg-indigo-100 text-indigo-800 text-md font-medium invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
