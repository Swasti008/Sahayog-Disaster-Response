import React from "react";
import { Button, Fab, Box, colors } from "@mui/material";
import { Card, CardContent, Typography } from "@mui/material";
import { MapPin, AlertTriangle, Globe, CloudRain, Shield } from "lucide-react"; // Assuming you want to use Shield for features
import InteractiveMap from "./InterativeMap";
import { Link } from "react-router-dom";
import End from "./End";
import Logo from "../assets/Logo.png";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import FetchData from "../components/services/FetchData";
import "../App.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WaterOutlinedIcon from "@mui/icons-material/WaterOutlined";
import { Badge } from "flowbite-react";
import { HiClock } from "react-icons/hi";
import { LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const socket = io("http://localhost:3000");

export default function Home() {
  const [alerts, setAlerts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await FetchData();
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

  // Fetch weather data based on user's location
  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=4ed98d532b4c809519991fa9cf60197c`
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch weather data.");
        }

        const data = await response.json();
        setWeather({
          temperature: data.main.temp,
          condition: data.weather[0].description,
          location: data.name,
        });
      } catch (err) {
        setError("Unable to fetch weather data. Please try again.");
        console.error("Weather API Error:", err);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          fetchWeather(coords.latitude, coords.longitude);
        },
        () => {
          setError("Location access denied. Cannot fetch weather.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="min-h-screen" style={{backgroundColor: "#dbeafe"}}>
      <Header/>
      <nav className="navbar mt-4 mb-4">
      <div className="navbar-container">
        <a href="/" className="navbar-item">Home</a>
        <a href="/about" className="navbar-item">About</a>
        <a href="/contact" className="navbar-item">Contact</a>
        <a href="/login" className="navbar-item login-button">Login</a>
      </div>
    </nav>

      <div className="bg- text-white p-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex space-x-8 items-center">
          <div className="flex items-center space-x-2 bg-red-600 px-4 py-1 rounded-full">
            <Globe className="text-yellow-300" size={16} />
            <span className="text-sm">1.8 Magnitude</span>
            <span className="text-xs text-blue-200">Chamoli, Uttarakhand</span>
            <span className="text-xs text-blue-100">17 Sep 2024 22:25:05</span>
          </div>
          <div className="flex items-center space-x-2 bg-blue-600 px-4 py-1 rounded-full">
            <AlertTriangle className="text-orange-300" size={16} />
            <span className="text-sm">4.7 Magnitude</span>
            <span className="text-xs text-blue-200">Tajikistan</span>
            <span className="text-xs text-blue-100">17 Sep 2024 19:58:09</span>
          </div>
          <div className="flex items-center space-x-2 bg-purple-800 px-4 py-1 rounded-full">
            <MapPin className="text-red-300" size={16} />
            <span className="text-sm">3.3 Magnitude</span>
            <span className="text-xs text-blue-200">Nepal</span>
            <span className="text-xs text-blue-100">17 Sep 2024 16:45:30</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 mt-4"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Card className="bg-white shadow h-128">
              <CardContent className="p-4">
                <div className="bg-gray-200 h-144 flex">
                  <InteractiveMap disasters={alerts} />
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="bg-white shadow mb-4">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-2">ALERT LIST</h2>
                <div className="space-y-2 h-[30vh] overflow-y-scroll custom-scrollbar">
                  <div className="alert-box bg-red-500 text-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    Heavy Rain: Chhatarpur, Katni, Panna, Tikamgarh districts
                  </div>
                  <div className="alert-box bg-orange-500 text-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    Moderate Thunderstorms: Bhind, Datia, Dindori, Harda
                  </div>
                  <div className="alert-box bg-yellow-500 text-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    Light Thunderstorms: Agar-Malwa, Anuppur, Betul, Bhopal
                  </div>
                  <div className="alert-box bg-red-500 text-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    Heavy Rain: Chhatarpur, Katni, Panna, Tikamgarh districts
                  </div>
                  <div className="alert-box bg-orange-500 text-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    Moderate Thunderstorms: Bhind, Datia, Dindori, Harda
                  </div>
                  <div className="alert-box bg-yellow-500 text-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    Light Thunderstorms: Agar-Malwa, Anuppur, Betul, Bhopal
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-blue-500 to-light-blue-400 text-white shadow-2xl rounded-lg h-60">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <h2 className="text-2xl font-bold tracking-wide mb-2">
                  Weather Forecast
                </h2>
                <div className="flex items-center justify-between bg-purple-500 shadow-xl p-3 rounded-xl">
                  <div>
                    {weather ? (
                      <div>
                      <p className="text-5xl text-white font-extrabold text-shadow-xl">
                      {weather.temperature}°C
                    </p>
                    <p className="text-lg text-white">
                      {weather.condition}
                      <WaterOutlinedIcon className="ml-1 mb-1" />
                    </p>
                    <p className="text-sm text-white">
                      {weather.location}
                    </p>
                    </div>
                    ) : (
                      <p>{error || "Fetching weather..."}</p>
                    )}
                  </div>
                  <CloudRain
                    size={60}
                    className="text-white drop-shadow-xl animate-pulse"
                  />
                </div>
                <p className="mt-4 text-sm text-blue-900">
                  {/* <AccessTimeIcon sx={{height: '2.8vh'}}/> */}
                  <Badge
                    color="indigo"
                    icon={HiClock}
                    style={{ width: "fit-content" }}
                    className="shadow-md border border-blue-200 text-sm"
                  >
                    &nbsp;Last Updated: 19 Sep 2024 2:32PM
                  </Badge>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={handleNavigation}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
          group flex items-center justify-center 
          bg-blue-600 text-white 
          rounded-full 
          shadow-2xl hover:shadow-blue-500/50 
          transition-all duration-300 ease-in-out
          hover:scale-105 active:scale-95
          ${isHovered ? "w-64" : "w-16 px-0"}
          h-14 
          overflow-hidden 
          focus:outline-none
        `}
          >
            <div className="flex items-center space-x-3">
              <LayoutDashboard
                className={`
              text-white 
              transition-transform duration-300`}
              size={34}
              />
              {isHovered && (
                <span
                  className="
                text-md font-medium 
                whitespace-nowrap 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300"
                >
                  Go to Dashboard
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Key Features Section */}
        <section className="mt-16">
          <hr></hr>
          <h2 className="text-center text-2xl font-bold mb-8 mt-2">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="bg-white shadow p-6">
              <CardContent className="text-center">
                <Shield className="mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold mb-2">
                  Real-Time Data Aggregation
                </h3>
                <p>
                  Collects and analyzes data from various sources including
                  social media, news outlets, and user reports for accurate
                  disaster information.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-white shadow p-6">
              <CardContent className="text-center">
                <Shield className="mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold mb-2">
                  Credibility Scoring System
                </h3>
                <p>
                  Automatically assigns credibility scores to sources based on
                  location, number of followers, and posting activity, ensuring
                  reliable information.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-white shadow p-6">
              <CardContent className="text-center">
                <Shield className="mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold mb-2">
                  User-Friendly Dashboard
                </h3>
                <p>
                  Provides disaster management agencies with a streamlined,
                  easy-to-use dashboard for quick access to categorized reports
                  and alerts.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <End />
    </div>
  );
}
