import React, { useState, useMemo } from "react";
import "../css/Dashboard.css";
import CardComponent from "./CardComponent";
import moment from "moment";
import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import { useEffect } from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const Dashboard = ({ alerts }) => {
  const [viewMode, setViewMode] = useState("scroll");
  const [sortOrder, setSortOrder] = useState("newest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique alert types
  const alertTypes = useMemo(() => {
    if (!alerts) return [];
    const types = [...new Set(alerts.map((alert) => alert.type))];
    return ["all", ...types];
  }, [alerts]);

  // Combined filtering function incorporating search and type filters
  const filteredAlerts = useMemo(() => {
    if (!alerts) return [];

    let filtered = [...alerts];

    // Apply type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((alert) => alert.type === selectedType);
    }

    // Apply search filter if there's a search term
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (alert) =>
          (alert.location?.city &&
            alert.location.city.toLowerCase().includes(lowercasedSearch)) ||
          (alert.location?.state &&
            alert.location.state.toLowerCase().includes(lowercasedSearch)) ||
          (alert.type && alert.type.toLowerCase().includes(lowercasedSearch)) ||
          (alert.timestamp &&
            moment(alert.timestamp)
              .format("DD/MMM/YYYY")
              .toLowerCase()
              .includes(lowercasedSearch))
      );
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [alerts, selectedType, searchTerm, sortOrder]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortOptions = [
    {
      value: "newest",
      label: "Newest First",
      icon: <ChevronDown className="h-4 w-4" />,
    },
    {
      value: "oldest",
      label: "Oldest First",
      icon: <ChevronUp className="h-4 w-4" />,
    },
  ];

  return (
    <div className="p-0">
      <section
        id="AlertOverview"
        style={{ backgroundColor: "#ebf4fe" }}
        className="p-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold">Alert Overview</h1>
        </div>

        {/* Main Flex Container for Alert Overview and PieChart */}
        <div className="flex flex-col md:flex-row">
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
            <div className="recent-alerts-container p-6 bg-white rounded-2xl border border-white/20 shadow-lg backdrop-blur-sm">
              <h1 className="text-2xl font-bold mb-4 text-blue-700 border-b border-white/20 pb-2">
                Recent Alerts
              </h1>
              <div className="marquee overflow-hidden">
                <div className="alerts-container flex gap-6 space-x-4 shadow-xl">
                  {alerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`alert-item 
                ${alert.color ? "bg-orange-900/80" : "bg-blue-700/80"} 
                rounded-lg 
                p-4 
                min-w-[300px] 
                transform 
                transition-all 
                shadow-xl
                hover:scale-105 
                hover:shadow-xl`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-semibold text-white/90 truncate">
                          {alert.location?.city}, {alert.location?.state}
                        </p>
                        
                      </div>
                      <p className="text-xs text-white/70 flex justify-between">
                        {moment(alert?.timestamp).format("h:mm A")}{" "}
                        {moment(alert?.timestamp).format("DD/MMM/YYYY")}
                        <div
                          className={`
                          px-2 
                          py-1 
                          rounded-full 
                          text-xs 
                          ${alert.color ? "bg-orange-600" : "bg-blue-400"}
                          text-white`}
                        >
                          {alert?.type}
                        </div>
                      </p>
                      
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr />

      <section
        id="latestReport"
        className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden relative">
            {/* Decorative Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            {/* Header Section */}
            <div className="px-6 py-6 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full animate-pulse-slow">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                      Latest Reports
                    </h2>
                    <p className="text-sm text-gray-500">
                      Real-time monitoring and analysis
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative w-96 mr-4">
                    <input
                      type="text"
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400 absolute left-3 top-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>

                  <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("scroll")}
                      className={`px-4 py-2 transition-all duration-300 ${
                        viewMode === "scroll"
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`px-4 py-2 transition-all duration-300 ${
                        viewMode === "grid"
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter and Stats */}
            <div className="px-6 py-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-500">
                    Sort by Date:
                  </span>
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">
                        {sortOrder === "newest"
                          ? "Newest First"
                          : "Oldest First"}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                          isDropdownOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortOrder(option.value);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full flex items-center px-4 py-2 text-sm ${
                              sortOrder === option.value
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {option.icon}
                            <span className="ml-2">{option.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Type Filter */}
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-500">
                      Filter by Type:
                    </span>
                    <div className="relative">
                      <button
                        onClick={() =>
                          setIsTypeDropdownOpen(!isTypeDropdownOpen)
                        }
                        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <span className="text-sm text-gray-700 capitalize">
                          {selectedType === "all" ? "All Types" : selectedType}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                            isTypeDropdownOpen ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isTypeDropdownOpen && (
                        <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                          {alertTypes.map((type) => (
                            <button
                              key={type}
                              onClick={() => {
                                setSelectedType(type);
                                setIsTypeDropdownOpen(false);
                              }}
                              className={`w-full flex items-center px-4 py-2 text-sm capitalize ${
                                selectedType === type
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              <span className="ml-2">
                                {type === "all" ? "All Types" : type}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  Total Reports:{" "}
                  <span className="font-bold text-gray-700">
                    {filteredAlerts.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Content with View Mode */}
            <div className="p-6 bg-gray-50">
              {filteredAlerts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 mx-auto text-gray-300 mb-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                    No Reports Found
                  </h3>
                  <p className="text-gray-400">
                    {searchTerm
                      ? "No reports match your search criteria."
                      : selectedType === "all"
                      ? "There are currently no active alerts or reports to display."
                      : `There are no alerts of type "${selectedType}" to display.`}
                  </p>
                </div>
              ) : (
                <CardComponent data={filteredAlerts} viewMode={viewMode} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
