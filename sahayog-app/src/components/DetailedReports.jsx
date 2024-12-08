import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import fetchDistrictData from "./services/FetchDistrictData";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import moment from "moment";
import { Clock, Search, Clock as ClockIcon, ServerCrash } from "lucide-react";
import Modal from "./Model";
import QuickReports from "./QuickReportsNdrf";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const articlesRef = useRef(null); 

  if (!alert) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center w-[50vw]">
          <div className="text-blue-500 flex items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Detailed Report Unavailable
          </h2>
            <ServerCrash className="w-28 h-28 mx-auto mb-4 mr-4" />
          </div>
          <p className="mt-0 text-gray-600 leading-relaxed text-justify ml-2 mr-2">
            To access this section, please navigate to the <b>Dashboard</b> and click 
            on the <b>Track Reports</b> button under any single report. From there, 
            you can select the specific detailed report you'd like to view.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            This ensures you can explore detailed insights and metrics for the disaster report of your choice.
          </p>
          <button
            onClick={() => window.location.href = '/dashboard'} // Redirect to dashboard
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
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
        const response = await fetch(
          `http://localhost:3000/track-report/${alert._id}`
        );
        const data = await response.json();
        if (response.ok) {
          setQuickReports(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to fetch quick reports.");
      }
    };

    fetchQuickReports();
  }, [alert._id]);

  const fetchArticles = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/search?query=${query}`
      );
      setArticles(response.data.articles);

      if (articlesRef.current) {
        articlesRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error fetching news articles:", error.message);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter" && searchQuery) {
      fetchArticles(searchQuery);
    }
  };

  useEffect(() => {
    const FetchDistrictData = async () => {
      try {
        if (alert && alert.location) {
          const result = await fetchDistrictData(
            alert.location.state,
            alert.location.city
          );
          setDistrictData(result);
        }
      } catch (error) {
        console.error("Failed to fetch district data:", error);
      }
    };

    if (alert?.location?.state && alert?.location?.city) {
      FetchDistrictData();
    }
  }, [alert, isModalOpen]);

  const chartData = {
    labels: [
      "Population",
      "Active Users",
      "Rescue Operations",
      "Community Posts",
    ],
    datasets: [
      {
        label: "Disaster Metrics",
        data: [500000, 80, 10, 120],
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Disaster Impact Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-6 px-4">
      <div className="container mx-auto w-6xl">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden relative">
          {/* Decorative Gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          {/* Header Section */}
          <div className="px-6 py-6 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full animate-pulse-slow">
                  <ClockIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                    Detailed Disaster Report
                  </h2>
                  <p className="text-sm text-gray-500">
                    Comprehensive view of the disaster and its impact
                  </p>
                </div>
              </div>
              <div className="relative w-96">
                <input
                  type="text"
                  placeholder="Search for news.."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-4" />
              </div>
            </div>
          </div>

          {/* Key Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                Disaster Details
              </h3>
              <div className="space-y-3">
                <p>
                  <strong>Location:</strong> {alert.location?.city},{" "}
                  {alert.location?.state}
                </p>
                <p>
                  <strong>Type:</strong>{" "}
                  {alert.type?.charAt(0).toUpperCase() + alert.type?.slice(1)}
                </p>
                <p>
                  <strong>Timestamp:</strong> {formatDate(alert.timestamp)}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-blue-600">Total Posts</p>
                  <p className="text-2xl font-bold">
                    {alert.numberOfPosts || 0}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-green-600">Active Rescuers</p>
                  <p className="text-2xl font-bold">10</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                Map Location
              </h3>
              <MapContainer
                center={[
                  alert.location?.coordinates.latitude,
                  alert.location?.coordinates.longitude,
                ]}
                zoom={10}
                scrollWheelZoom={false}
                style={{ height: "250px", width: "100%" }}
                className="rounded-xl"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Marker
                  position={[
                    alert.location?.coordinates.latitude,
                    alert.location?.coordinates.longitude,
                  ]}
                  icon={customIcon}
                >
                  <Popup>
                    {alert.location?.city}, {alert.location?.state}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* Detailed Metrics and Reports */}
          <div className="pr-6 pl-6 pt-6 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                Disaster Impact Metrics
              </h3>
              <Chart type="bar" data={chartData} options={chartOptions} />
            </div>

            <div className="bg-white rounded-xl shadow-md pr-6 pl-6 pt-6 overflow-y-scroll h-[49vh]">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                  Quick Notes
                </h3>
                <div className="space-y-4 mb-16">
                  {" "}
                  {/* Added margin-bottom for spacing */}
                  {quickReports.length === 0 ? (
                    <p className="text-gray-500 text-center">
                      No quick notes available
                    </p>
                  ) : (
                    quickReports.map((report) => (
                      <div
                        key={report._id}
                        className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <p>
                          <strong>Status:</strong> {report.status}
                        </p>
                        <p>
                          <strong>Comments:</strong> {report.comments}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
              {/* Sticky Button Section */}
              <div className="bg-white pb-3 px-4 sticky bottom-0">
                <button
                  onClick={openModal}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add Quick Note
                </button>
              </div>
            </div>
          </div>

          {/* News and Social Media Section */}
          <div className="p-6 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                Social Media Posts
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {alert.posts?.map((post, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg">
                    <p className="font-semibold">{post.user.username}</p>
                    <p className="text-gray-600">{post.post.text}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {moment(post.createdAt).fromNow()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="bg-white rounded-xl shadow-md p-6"
              ref={articlesRef}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                Related News Articles
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {articles.length === 0 ? (
                  <p className="text-gray-500 text-center">No articles found</p>
                ) : (
                  articles.map((article, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <h4 className="font-semibold text-gray-800">
                        {article.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {article.description}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          {moment(article.publishedAt).fromNow()}
                        </span>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 text-sm hover:underline"
                        >
                          Read more
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Modal for Quick Report */}
          {isModalOpen && (
            <Modal closeModal={closeModal}>
              <QuickReports alert={alert} />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailedReports;
