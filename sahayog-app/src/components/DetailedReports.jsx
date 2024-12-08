import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import fetchDistrictData from './services/FetchDistrictData';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import QuickReports from './QuickReportsNdrf';
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import Modal from './Model';


const customIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", 
  iconSize: [32, 32],
  iconAnchor: [16, 32], 
  popupAnchor: [0, -32], 
});

function DetailedReports() {
  const location = useLocation();
  const { alert } = location.state || {}; 
  const [quickReports, setQuickReports] = useState([]);
  const [districtData, setDistrictData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [error, setError] = useState('');
  // const [quickReportData, setQuickReportData] = useState({
  //   title: '',
  //   description: '',
  // })

  if (!alert) {
    return <p>No data available to track reports.</p>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    const fetchQuickReports = async () => {
      try {
        const response = await fetch(`http://localhost:3000/track-report/${alert._id}`);
        const data = await response.json();
        if (response.ok) {
          setQuickReports(data); // Set the fetched reports in state
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to fetch quick reports.");
      }
    };

    fetchQuickReports();
  }, [quickReports]);

  const fetchArticles = async (query) => {
    try {
      const response = await axios.get(`http://localhost:4000/search?query=${query}`);
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching news articles:', error.message);
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Fetch articles when search query changes
  useEffect(() => {
    if (searchQuery) {
      fetchArticles(searchQuery);
    } else {
      setArticles([]); // Clear articles when search query is empty
    }
  }, [searchQuery]);

  useEffect(() => {
    const FetchDistrictData = async () => {
      try {
        if (alert && alert.location) {
          const result = await fetchDistrictData(alert.location.state, alert.location.city);
          setDistrictData(result);
        }
      } catch (error) {
        console.error("Failed to fetch district data:", error);
      }
    };

    // Only fetch data if alert and location data exist
    if (alert?.location?.state && alert?.location?.city) {
      FetchDistrictData();
    }
  }, [alert]);
  const chartData = {
    labels: ['Population', 'Active Users', 'Rescue Operations Active', 'Number of Posts'],
    datasets: [
      {
        label: 'Disaster Metrics',
        data: [500000, 80, 10, 120], // Hardcoded values for now
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Active Users
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Rescue Operations',
        data: [0, 0, 10, 0], // Active Rescue Operations
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
      {
        label: 'Posts',
        data: [0, 0, 0, 120], // Number of Posts
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Disaster Metrics Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50, // Adjust tick intervals for clarity
        },
      },
    },
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
  };




  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <h1 className="text-2xl font-bold mb-6">Detailed Report</h1>

      {/* Main Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Location and Disaster Info */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-2">Location</h2>
          <p>{alert.location?.city}, {alert.location?.state}</p>
          <h2 className="text-lg font-semibold mt-4 mb-2">Disaster Type</h2>
          <p>{alert.type?.charAt(0).toUpperCase() + alert.type?.slice(1)}</p>
          <h2 className="text-lg font-semibold mt-4 mb-2">Timings</h2>
          <p>{formatDate(alert.timestamp)}</p>
        </div>

        {/* Social Media Posts */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-4">Social Media Posts ({alert.numberOfPosts || 0})</h2>
          <div className="space-y-2 max-h-44 overflow-y-auto">
            {alert.posts?.map((post, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded shadow-md">
                <p className="font-semibold text-sm">{post.user.username}</p>
                <p className="text-sm mt-1">{post.post.text}</p>
                <p className="text-xs text-gray-500 mt-2">{formatDate(post.createdAt)}</p>
              </div>
            ))}
            {/* If no posts, show a message */}
            {alert.posts?.length === 0 && <p>No posts available for this disaster.</p>}
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-4">Map Location</h2>
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={3}
            scrollWheelZoom={false}
            style={{ height: "200px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[
                        alert.location?.coordinates.latitude,
                        alert.location?.coordinates.longitude,
                      ]}
                      icon={customIcon}>
              <Popup>
                {alert.location?.city || "Unknown City"},{" "}
                {alert.location?.state || "Unknown State"}
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Image Gallery */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-4">Images</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-24 bg-gray-200"></div>
            <div className="h-24 bg-gray-200"></div>
            <div className="h-24 bg-gray-200"></div>
            <div className="h-24 bg-gray-200"></div>
          </div>
        </div>

        {/* Graph Overview */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-4">Graph Overview</h2>
          <div className="h-60 bg-gray-300 flex items-center justify-center">
            <Chart type="bar" data={chartData} options={chartOptions} />
          </div>
        </div>


        {/* News Articles */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-4">News Articles</h2>
          {/* Search Bar */}
          <input
            type="text"
            className="border border-gray-300 rounded p-2 mb-4 w-full"
            placeholder="Search news articles..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="space-y-2 max-h-44 overflow-y-auto">
            {articles.length === 0 && searchQuery ? (
              <p>No articles found for "{searchQuery}".</p>
            ) : (
              articles.map((article, index) => (
                <div key={index} className="bg-gray-200 p-4 rounded shadow-md">
                  <p className="font-semibold text-sm">{article.author || "Unknown Author"}</p>
                  <p className="text-sm mt-1">{article.title}</p>
                  <p className="text-xs text-gray-500 mt-2">{formatDate(article.publishedAt)}</p>
                  <a href={article.url} className="text-blue-500 text-sm mt-2 block" target="_blank" rel="noopener noreferrer">Read more</a>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sahayog App Details */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-4">Sahayog App Details</h2>
          <p>Active People: 100</p>
          <p>Community Chat: Enabled</p>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-4">Contact Info: {districtData?.name}</h2>
          <ul>
            <p><strong>Fire Department:</strong> {districtData ? districtData.fire_department?.contact_number || "N/A" : "Loading..."}</p>
            <p><strong>Police Contact:</strong> {districtData ? districtData.police_station?.contact_number || "N/A" : "Loading..."}</p>
            <p><strong>Hospital Contact:</strong> {districtData ? districtData.hospitals[0]?.contact_number || "N/A" : "Loading..."}</p>
          </ul>
        </div>

        {/* Quick Reports */}
        
         



{/* Display existing quick reports */}
<div className="p-6 bg-white rounded-lg shadow-md ">
  {quickReports.length === 0 ? (
    <p className="text-center text-gray-500">No reports found for this disaster.</p>
  ) : (
    <>
      <h3 className="text-2xl font-semibold mb-4">Existing Quick Reports</h3>
      <div className="space-y-6 max-h-44 overflow-y-auto">
        {quickReports.map((report) => (
          <div
            key={report._id}
            className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <p className="text-lg font-medium text-gray-800">Status: <span className="font-normal text-gray-600">{report.status}</span></p>
            <p className="text-lg font-medium text-gray-800">Comments: <span className="font-normal text-gray-600">{report.comments}</span></p>
            <p className="text-lg font-medium text-gray-800">Team Message: <span className="font-normal text-gray-600">{report.teamMessage}</span></p>
          </div>
        ))}
      </div>
    </>
  )}



{error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={openModal}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add or Update Quick Report
      </button>

      {/* Modal for Quick Report Form */}
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <QuickReports alert={alert}/>
        </Modal>
      )}
      
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Download Report
      </button>
    </div>

        {/* Tracked Reports Section */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-4">Tracked Reports</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="bg-gray-200 p-4 rounded">
              <h3 className="font-semibold text-base">Report 1</h3>
              <p>Location: Kangra, Himachal Pradesh</p>
              <p>Type: Landslide</p>
              <p>Date: 12 Dec, 2024</p>
            </div>
            <div className="bg-gray-200 p-4 rounded">
              <h3 className="font-semibold text-base">Report 2</h3>
              <p>Location: Shimla, Himachal Pradesh</p>
              <p>Type: Flood</p>
              <p>Date: 13 Dec, 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedReports;
