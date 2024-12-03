import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import {
  MapPin,
  AlertTriangle,
  Globe,
  CloudRain,
  Shield,
  LayoutDashboard,
  Languages,
} from "lucide-react"; // Assuming you want to use Shield for features
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
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import LoginDialog from "./LoginDialog";

const socket = io("http://localhost:3000");

export default function Home() {
  const [alerts, setAlerts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

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

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        navbar.style.transform = "translateY(0)";
      } else {
        // Scrolling up
        navbar.style.transform = "translateY(-110%)";
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpenLoginDialog = () => {
    setOpenLoginDialog(true);
  };

  // Close the login dialog
  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
    setCredentials({ username: "", password: "" });
  };

  // Handle the login form submission
  const handleLogin = (credentials) => {
    const { username, password } = credentials;

    if (
      username === "NDRFCOORDINATOR" &&
      password === "PASSWORDNDRFCOORDINATOR"
    ) {
      handleCloseLoginDialog();
      navigate("/dashboard");
      return true; // Login successful
    } else {
      return false; // Login failed
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#dbeafe" }}>
      <Header />
      <nav className="navbar mt-4 mb-4">
        <div className="navbar-container">
          <a href="/" className="navbar-item">
            Home
          </a>
          <a className="navbar-item">About</a>
          <a href="/contact" className="navbar-item">
            Contact
          </a>
          <a href="/login" className="navbar-item login-button">
            Login
          </a>
        </div>
      </nav>

      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex space-x-8 items-center">
          {[
            {
              icon: Globe,
              color: "yellow-300",
              magnitude: "1.8",
              location: "Chamoli, Uttarakhand",
              time: "17 Sep 2024 22:25:05",
            },
            {
              icon: AlertTriangle,
              color: "orange-300",
              magnitude: "4.7",
              location: "Tajikistan",
              time: "17 Sep 2024 19:58:09",
            },
            {
              icon: MapPin,
              color: "red-300",
              magnitude: "3.3",
              location: "Nepal",
              time: "17 Sep 2024 16:45:30",
            },
          ].map((disaster, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-white/20 px-4 py-1 rounded-full"
            >
              <disaster.icon className={`text-${disaster.color}`} size={16} />
              <span className="text-sm font-medium">
                {disaster.magnitude} Magnitude
              </span>
              <span className="text-xs opacity-75">{disaster.location}</span>
              <span className="text-xs opacity-50">{disaster.time}</span>
            </div>
          ))}
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
            <div className="alert-list-container mb-4">
              <div className="alert-list">
                <div className="alert-box bg-red-500 text-white shadow-md">
                  Heavy Rain: Chhatarpur, Katni, Panna, Tikamgarh districts
                </div>
                <div className="alert-box bg-orange-500 text-white shadow-md">
                  Moderate Thunderstorms: Bhind, Datia, Dindori, Harda
                </div>
                <div className="alert-box bg-yellow-500 text-white shadow-md">
                  Light Thunderstorms: Agar-Malwa, Anuppur, Betul, Bhopal
                </div>
                <div className="alert-box bg-red-500 text-white shadow-md">
                  Heavy Rain: Chhatarpur, Katni, Panna, Tikamgarh districts
                </div>
                <div className="alert-box bg-orange-500 text-white shadow-md">
                  Moderate Thunderstorms: Bhind, Datia, Dindori, Harda
                </div>
                <div className="alert-box bg-yellow-500 text-white shadow-md">
                  Light Thunderstorms: Agar-Malwa, Anuppur, Betul, Bhopal
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-r from-blue-500 to-light-blue-400 text-white shadow-2xl rounded-lg h-64">
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
                        <p className="text-sm text-white">{weather.location}</p>
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
            onClick={handleOpenLoginDialog}
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
                className={`text-white transition-transform duration-300`}
                size={34}
              />
              {isHovered && (
                <span className="text-md font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Go to Dashboard
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Login Dialog */}

        <LoginDialog
          open={openLoginDialog}
          onClose={handleCloseLoginDialog}
          onLogin={handleLogin}
          credentials={credentials}
          setCredentials={setCredentials}
        />

        {/* Key Features Section */}
        <section className="mt-16 bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <hr className="border-t-2 border-blue-200 mb-8 w-24 mx-auto" />
            <h2 className="text-center text-4xl font-extrabold mb-12 text-gray-800 tracking-tight">
              Powerful Platform Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group">
                <Card
                  className="
        bg-white 
        shadow-lg 
        hover:shadow-2xl 
        hover:scale-101 
        transition-all 
        duration-500 
        ease-in-out 
        border-t-4 
        border-blue-500 
        rounded-xl 
        overflow-hidden
      "
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className="
          bg-blue-100 
          text-blue-600 
          rounded-full 
          w-20 
          h-20 
          flex 
          items-center 
          justify-center 
          mx-auto 
          mb-6 
          transform 
          group-hover:rotate-12 
          transition-transform 
          duration-500
        "
                    >
                      <Globe size={42} className="text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                      Real-Time Data Aggregation
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Collects and analyzes data from multiple sources including
                      social media, news outlets, and user reports to provide
                      accurate and timely disaster information.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Feature 2 */}
              <div className="group">
                <Card
                  className="
        bg-white 
        shadow-lg 
        hover:shadow-2xl 
        hover:scale-101 
        transition-all 
        duration-500 
        ease-in-out 
        border-t-4 
        border-green-500 
        rounded-xl 
        overflow-hidden
      "
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className="
          bg-green-100 
          text-green-600 
          rounded-full 
          w-20 
          h-20 
          flex 
          items-center 
          justify-center 
          mx-auto 
          mb-6 
          transform 
          group-hover:rotate-12 
          transition-transform 
          duration-500
        "
                    >
                      <Languages size={42} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                      Multi-Language Support
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Seamlessly supports multiple languages for content and
                      interface, enabling users from diverse regions to interact
                      with the platform effectively and intuitively.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Feature 3 */}
              <div className="group">
                <Card
                  className="
        bg-white 
        shadow-lg 
        hover:shadow-2xl 
        hover:scale-101 
        transition-all 
        duration-500 
        ease-in-out 
        border-t-4 
        border-purple-500 
        rounded-xl 
        overflow-hidden
      "
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className="
          bg-purple-100 
          text-purple-600 
          rounded-full 
          w-20 
          h-20 
          flex 
          items-center 
          justify-center 
          mx-auto 
          mb-6 
          transform 
          group-hover:rotate-12 
          transition-transform 
          duration-500
        "
                    >
                      <LayoutDashboard size={42} className="text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                      User-Friendly Dashboard
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Provides disaster management agencies with a streamlined,
                      intuitive dashboard for rapid access to categorized
                      reports, real-time alerts, and critical information.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <End />
    </div>
  );
}
