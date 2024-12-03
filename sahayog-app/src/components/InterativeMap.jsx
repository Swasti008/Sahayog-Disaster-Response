import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Clock } from "lucide-react";
import moment from "moment";

const getSeverityIcon = (severity) => {
  let iconUrl = "";
  switch (severity.toLowerCase()) {
    case "high":
      iconUrl = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
      break;
    case "medium":
      iconUrl = "https://maps.google.com/mapfiles/ms/icons/orange-dot.png";
      break;
    case "low":
      iconUrl = "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      break;
    default:
      iconUrl = "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
      break;
  }

  return L.icon({
    iconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

const InteractiveMap = ({ disasters }) => {
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setSelectedDisaster(null);
    setOpenSnackbar(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-6 px-4 w-full">
      <div className="container mx-auto w-6xl">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden relative">
          {/* Decorative Gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          {/* Header Section */}
          <div className="px-6 py-6 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full animate-pulse-slow">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                    Disaster Map
                  </h2>
                  <p className="text-sm text-gray-500">
                    Real-time disaster monitoring
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="p-6 bg-gray-50">
            <div className="bg-white rounded-2xl shadow-inner overflow-hidden">
              <MapContainer
                center={[20.5937, 78.9629]} // Centered on India
                zoom={5}
                style={{ height: "60vh", width: "100%" }}
                className="z-10"
              >
                <TileLayer 
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                  className="filter brightness-95"
                />
                {disasters
                  .filter(
                    (disaster) =>
                      disaster.location?.coordinates && 
                      disaster.location.coordinates.latitude !== null && 
                      disaster.location.coordinates.longitude !== null
                  )
                  .map((disaster) => (
                    <Marker
                      key={disaster.id}
                      position={[
                        disaster.location?.coordinates.latitude,
                        disaster.location?.coordinates.longitude,
                      ]}
                      icon={getSeverityIcon(
                        disaster.criticatily?.severity || "high"
                      )}
                      eventHandlers={{
                        click: () => {
                          setSelectedDisaster(disaster);
                          setOpenSnackbar(true);
                        },
                      }}
                    >
                      <Popup className="custom-popup">
                        <div className="p-4 bg-white rounded-lg shadow-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold text-gray-800">
                              {disaster.type} Alert
                            </h3>
                            <span 
                              className={`px-2 py-1 rounded-full text-xs font-semibold 
                                ${
                                  disaster.criticatily?.severity?.toLowerCase() === 'high' 
                                    ? 'bg-red-100 text-red-700'
                                    : disaster.criticatily?.severity?.toLowerCase() === 'medium'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-green-100 text-green-700'
                                }`}
                            >
                              {disaster.criticatily?.severity}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {disaster.location?.city}, {disaster.location?.state}
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Snackbar for Disaster Details */}
      {selectedDisaster && openSnackbar && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl">
          <div 
            className={`
              p-6 rounded-2xl shadow-2xl transition-all duration-300 
              ${
                selectedDisaster.criticatily?.severity?.toLowerCase() === 'high'
                  ? 'bg-red-50 border-2 border-red-200'
                  : selectedDisaster.criticatily?.severity?.toLowerCase() === 'medium'
                  ? 'bg-yellow-50 border-2 border-yellow-200'
                  : 'bg-green-50 border-2 border-green-200'
              }
            `}
          >
            <div className="flex justify-between items-start">
              <div className="flex-grow">
                <div className="flex items-center mb-3">
                  <MapPin className="h-6 w-6 mr-3 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-800">
                    {selectedDisaster.type} Alert - {selectedDisaster.criticatily?.severity} Severity
                  </h2>
                </div>
                
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>Location:</strong> {selectedDisaster.location?.city}, {selectedDisaster.location?.state}
                  </p>
                  <p className="text-gray-700">
                    <strong>Description:</strong> {selectedDisaster.description}
                  </p>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>
                      {moment(selectedDisaster?.timestamp).format("h:mm A, DD/MMM/YYYY")}
                    </span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleCloseSnackbar}
                className="ml-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;