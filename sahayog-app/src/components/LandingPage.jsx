import React from "react";
import { Button } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { MapPin, AlertTriangle, Globe, CloudRain, Shield } from "lucide-react"; // Assuming you want to use Shield for features
import InteractiveMap from "./InterativeMap";
import {Link} from "react-router-dom";
import End from "./End";
import Logo from "../assets/Logo.png";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import FetchData from "../components/services/FetchData";

const socket = io("http://localhost:3000");

export default function Home() {
  const [alerts, setAlerts] = useState([]);

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
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top banner */}

      {/* Main navbar */}
      <nav className="bg-blue-600 text-white p-4 ">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex text-2xl font-bold items-center">
            <img src={Logo} className="h-16" />
            सहयोग NATIONAL DISASTER ALERT PORTAL
          </div>
          <div className="space-x-4">
            <Button variant="ghost" className="text-white">
              HOME
            </Button>
            <Link to="/dashboard">
              <Button variant="ghost" className="text-white">
                DASHBOARD
              </Button>
            </Link>
            <Button variant="ghost" className="text-white">
              ABOUT
            </Button>
            <Button variant="ghost" className="text-white">
              DOS & DON'TS
            </Button>
            <Button variant="ghost" className="text-white">
              CONTACT
            </Button>
          </div>
        </div>
      </nav>

      {/* Recent earthquakes ticker */}
      <div className="bg-blue-500 text-white p-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          *** 1.8 Magnitude | Chamoli, Uttarakhand | 17 Sep 2024 22:25:05 ***
          *** 4.7 Magnitude | Tajikistan | 17 Sep 2024 19:58:09 *** *** 3.3
          Magnitude | Nepal | 17 Sep 2024 16:45:30 ***
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 mt-4">
          <Card className="bg-white shadow">
            <CardContent className="p-4 flex items-center justify-center">
              <MapPin className="mr-2" />
              <span>CURRENT LOCATION CAP ALERT</span>
            </CardContent>
          </Card>
          <Card className="bg-white shadow">
            <CardContent className="p-4 flex items-center justify-center">
              <Globe className="mr-2" />
              <span>ALL INDIA CAP ALERT</span>
            </CardContent>
          </Card>
          <Card className="bg-white shadow">
            <CardContent className="p-4 flex items-center justify-center">
              <AlertTriangle className="mr-2" />
              <span>STATE WISE CAP ALERT</span>
            </CardContent>
          </Card>
          <Card className="bg-white shadow">
            <CardContent className="p-4 flex items-center justify-center">
              <CloudRain className="mr-2" />
              <span>FORECAST</span>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Card className="bg-white shadow h-128">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-4">Interactive Map</h2>
                {/* Placeholder for the interactive map */}
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
                <div className="space-y-2">
                  <div className="bg-red-500 text-white p-2 rounded">
                    Heavy Rain: Chhatarpur, Katni, Panna, Tikamgarh districts
                  </div>
                  <div className="bg-orange-500 text-white p-2 rounded">
                    Moderate Thunderstorms: Bhind, Datia, Dindori, Harda
                  </div>
                  <div className="bg-yellow-500 text-white p-2 rounded">
                    Light Thunderstorms: Agar-Malwa, Anuppur, Betul, Bhopal
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-600 text-white shadow h-60">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-2">Weather Forecast</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">29.2°C</p>
                    <p>Partly Cloudy</p>
                    <p>Baddi,Himachal Pradesh</p>
                  </div>
                  <CloudRain size={48} />
                </div>
                <p className="mt-2">Last Updated: 19 Sep 2024 2:32PM</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Features Section */}
        <section className="mt-16">
        <hr></hr>
          <h2 className="text-center text-2xl font-bold mb-8 mt-2">Key Features</h2>
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
