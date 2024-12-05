import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Card, CardContent } from "@mui/material";
import { Phone, X } from "lucide-react";
import {
  MapPin,
  AlertTriangle,
  Globe,
  CloudRain,
  Shield,
  LayoutDashboard,
  Languages,
  Hospital
} from "lucide-react"; 
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
import { Tooltip } from '@mui/material';
import EmergencyContacts from "./EmergencyContacts"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import KeyFeatures from "./KeyFeatures";

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
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [openContactsDialog, setOpenContactsDialog] = useState(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(new Date());

  const formatLastUpdatedTime = (date) => {
    return date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const [selectedDistrict, setSelectedDistrict] = useState('Shimla');


  const handleOpenContactsDialog = () => {
    setOpenContactsDialog(true);
  };

  const handleCloseContactsDialog = () => {
    setOpenContactsDialog(false);
  };


  const navigate = useNavigate();

  const fetchLocationDetails = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`
      );
      
      if (!response.ok) {
        throw new Error('Location details fetch failed');
      }

      const data = await response.json();
      return {
        state: data.address.state || data.address.region || 'Unknown',
        country: data.address.country || 'Unknown',
        displayName: data.display_name
      };
    } catch (error) {
      console.error('Error fetching location details:', error);
      return { state: 'Unknown', country: 'Unknown', displayName: 'Location not found' };
    }
  };

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

    const updateLastUpdatedTime = () => {
      setLastUpdatedTime(new Date());
    };

    const fetchWeather = async (latitude, longitude) => {
      try {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=4ed98d532b4c809519991fa9cf60197c`
        );

        if (!weatherResponse.ok) {
          const data = await weatherResponse.json();
          throw new Error(data.message || "Failed to fetch weather data.");
        }

        const weatherData = await weatherResponse.json();

        const locationData = await fetchLocationDetails(latitude, longitude);

        // console.log("Location Details in Weather Fetch:", locationData);

        setWeather({
          temperature: weatherData.main.temp,
          condition: weatherData.weather[0].description,
          location: weatherData.name,
          state: locationData.state,
          country: locationData.country
        });
        
        updateLastUpdatedTime();

      } catch (err) {
        setError("Unable to fetch weather and location data. Please try again.");
        console.error("API Error:", err);
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
    const fetchData = async () => {
      try {
        const result = await fetch('/api/alerts').then(res => res.json());
        setAlerts(result);

        const details = {};
        for (const disaster of result) {
          if (disaster.latitude && disaster.longitude) {
            details[`${disaster.latitude},${disaster.longitude}`] = await fetchLocationDetails(
              disaster.latitude, 
              disaster.longitude
            );
          }
        }
        setLocationDetails(details);
      } catch (error) {
        console.error('Failed to fetch alerts', error);
      }
    };

    fetchData();

    socket.on("newEntry", async (data) => {
      console.log("Received new entry: ", data);
      setAlerts((prevAlerts) => [...prevAlerts, { ...data, color: "orange" }]);
      
      if (data.latitude && data.longitude) {
        const locationInfo = await fetchLocationDetails(data.latitude, data.longitude);
        setLocationDetails(prev => ({
          ...prev,
          [`${data.latitude},${data.longitude}`]: locationInfo
        }));
      }
    });

    return () => {
      socket.off("newEntry");
    };
  }, []);



  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        navbar.style.transform = "translateY(0)";
      } else {
        navbar.style.transform = "translateY(-110%)";
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpenLoginDialog = () => {
    setOpenLoginDialog(true);
  };

  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
    setCredentials({ username: "", password: "" });
  };

  const handleLogin = (credentials) => {
    const { username, password } = credentials;

    if (
      username === "NDRFCOORDINATOR" &&
      password === "PASSWORDNDRFCOORDINATOR"
    ) {
      handleCloseLoginDialog();
      navigate("/dashboard");
      return true;
    } else {
      return false; 
    }
  };

  const [copiedNumber, setCopiedNumber] = useState(null);

  const handleCopy = (number) => {
    setCopiedNumber(number);
    setTimeout(() => setCopiedNumber(null), 2000); 
  };

  const CopyNumberTooltip = ({ number, children }) => (
    <CopyToClipboard text={number} onCopy={() => handleCopy(number)}>
      <Tooltip 
        title={copiedNumber === number ? "Copied!" : "Click to Copy"} 
        placement="top"
      >
        <span className="cursor-pointer">{children}</span>
      </Tooltip>
    </CopyToClipboard>
  );



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
                    &nbsp;Last Updated: {formatLastUpdatedTime(lastUpdatedTime)}
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

        <div className="fixed bottom-8 left-8 z-50">
        <button
          onClick={handleOpenContactsDialog}
          onMouseEnter={() => setIsContactHovered(true)}
          onMouseLeave={() => setIsContactHovered(false)}
          className={`
            group flex items-center justify-center 
            bg-red-600 text-white 
            rounded-full 
            shadow-2xl hover:shadow-red-500/50 
            transition-all duration-300 ease-in-out
            hover:scale-105 active:scale-95
            ${isContactHovered ? "w-64" : "w-16 px-0"}
            h-14 
            overflow-hidden 
            focus:outline-none
          `}
        >
          <div className="flex items-center ">
            <Phone className={`text-white transition-transform duration-300`} size={34} />
            {isContactHovered && (
              <span className="w-[40vw] text-md font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to access emergency contacts
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Emergency Contacts Dialog */}
      <EmergencyContacts openContactsDialog={openContactsDialog} handleCloseContactsDialog={handleCloseContactsDialog} CopyNumberTooltip={CopyNumberTooltip} selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict} />

        {/* Login Dialog */}
        <LoginDialog
          open={openLoginDialog}
          onClose={handleCloseLoginDialog}
          onLogin={handleLogin}
          credentials={credentials}
          setCredentials={setCredentials}
        />

        <KeyFeatures/>
      </main>
      <End />
    </div>
  );
}
