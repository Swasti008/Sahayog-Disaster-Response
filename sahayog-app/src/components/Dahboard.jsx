import React, { useState } from "react";
import "../css/Dashboard.css";
import PieChart from "./PieChart";
import CardComponent from "./CardComponent";
import moment from "moment";
import { useEffect } from "react";

const Dashboard = ({ alerts }) => {
  // State to manage the current view
  const [viewMode, setViewMode] = useState('scroll'); // 'scroll' or 'grid'
  
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
                      }`}
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
            </div>
          </div>
        </div>
      </section>
      
      <hr />
      
      {/* Latest Reports Section */}
      <section id="latestReport" className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden relative">
            {/* Decorative Gradient Overlay */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            {/* Header Section */}
            <div className="px-6 py-6 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Animated Icon */}
                  <div className="bg-blue-100 p-3 rounded-full animate-pulse-slow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
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

                {/* Advanced Search and View Toggle */}
                <div className="flex items-center space-x-4">
                  {/* Search Input */}
                  <div className="relative w-96 mr-4">
                    <input 
                      type="text" 
                      placeholder="Search reports..." 
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  {/* View Toggle Buttons */}
                  <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => setViewMode('scroll')}
                      className={`px-4 py-2 transition-all duration-300 ${
                        viewMode === 'scroll' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`px-4 py-2 transition-all duration-300 ${
                        viewMode === 'grid' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
                  <span className="text-sm font-medium text-gray-500">Filter:</span>
                  <div className="flex space-x-2">
                    {['All', 'Critical', 'Warning', 'Normal', 'Info'].map((filter) => (
                      <button 
                        key={filter} 
                        className="px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none"
                        style={{
                          backgroundColor: filter === 'Critical' ? '#FEE2E2' :
                                          filter === 'Warning' ? '#FEF3C7' :
                                          filter === 'Normal' ? '#D1FAE5' :
                                          filter === 'Info' ? '#DBEAFE' :
                                          '#F3F4F6',
                          color: filter === 'Critical' ? '#B91C1C' :
                                filter === 'Warning' ? '#B45309' :
                                filter === 'Normal' ? '#047857' :
                                filter === 'Info' ? '#1E40AF' :
                                '#4B5563'
                        }}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Total Reports: <span className="font-bold text-gray-700">{alerts.length}</span>
                </div>
              </div>
            </div>

            {/* Main Content with View Mode */}
            <div className="p-6 bg-gray-50">
              {alerts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                    No Reports Found
                  </h3>
                  <p className="text-gray-400">
                    There are currently no active alerts or reports to display.
                  </p>
                </div>
              ) : (
                <CardComponent data={alerts} viewMode={viewMode} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;