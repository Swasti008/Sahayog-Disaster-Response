import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Camera,
  X,
} from "lucide-react";
import axios from "axios";

const CardComponent = ({ data, viewMode = "scroll" }) => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [districtData, setDistrictData] = useState(null);

  useEffect(() => {
    // console.log(data);
  }, [data]);

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

  const handleDetailClick = async (alert) => {
    setSelectedAlert(alert);
      await fetchDistrictData(alert.location.state, alert.location.city);
  };  

  const handleCloseModal = () => {
    setSelectedAlert(null);
    setDistrictData(null)
  };

  const renderAlertCard = (alert) => (
    <div
      key={alert._id}
      className={`
        bg-white rounded-3xl shadow-lg transition-all duration-300 ease-in-out mb-6 overflow-hidden border-l-8 
        ${viewMode === "grid" ? "grid-card-style" : ""}
        hover:shadow-2xl hover:scale-[1.02] hover:opacity-95
      `}
      style={{
        borderLeftColor:
          alert.type === "critical"
            ? "#EF4444"
            : alert.type === "warning"
            ? "#F59E0B"
            : alert.type === "info"
            ? "#3B82F6"
            : "#10B981",
      }}
    >
      <div
        className={`w-24 flex justify-center ml-5 mt-5 left-4 text-pretty font-semibold px-3 py-1 rounded-full text-gray-700 bg-gray-200 opacity-80 shadow-md w-fit`}
      >
        {alert.type?.charAt(0).toUpperCase() + alert.type?.slice(1)}{" "}
        {/* Capitalize disaster type */}
      </div>

      <div className="p-6">
        <div
          className={`grid grid-cols-1 gap-4 ${
            viewMode === "grid" ? "grid-view-layout" : "md:grid-cols-2"
          }`}
        >
          <div>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="mr-2 text-blue-500" size={20} />
              <span className="font-medium">
                {alert.location?.city}, {alert.location?.state},{" "}
                {alert.location?.country}
              </span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <Clock className="mr-2 text-blue-500" size={20} />
              <span>{formatDate(alert.timestamp)}</span>
            </div>
            <p className="text-gray-700 mt-2 bg-gray-50 p-3 rounded-lg border-l-4 border-blue-500">
              <strong>Description:</strong> {alert.description}
            </p>
          </div>
          <div
            className={`flex ${
              viewMode === "grid"
                ? "flex-row mt-3 items-center"
                : "flex-col gap-3"
            } align-center ${viewMode === "grid" ? "space-x-4" : ""}`}
          >
            <button
              className={`bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-lg hover:from-green-500 hover:to-green-600 transition-all text-sm duration-200 ease-in-out w-full max-w-[140px] ml-auto
              ${viewMode === "grid" ? "px-1 h-8" : ""}
            `}
            >
              Approve
            </button>
            <button
              onClick={() => handleDetailClick(alert)}
              className={`bg-gradient-to-r from-blue-400 to-blue-500 text-white px-3 py-2 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-200 text-sm ease-in-out w-full max-w-[140px] ml-auto
                ${viewMode === "grid" ? "px-1 h-8" : ""}
              `}
            >
              View Details
            </button>
            <button
              className={`bg-gradient-to-r from-red-400 to-red-500 text-white px-4 py-2 rounded-lg hover:from-red-500 hover:to-red-600 transition-all duration-200 text-sm ease-in-out w-full max-w-[140px] ml-auto
              ${viewMode === "grid" ? "px-1 h-8" : ""}
            `}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    console.log(districtData)
  }, [districtData])

  const fetchDistrictData = async (state, city) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/emergency/getData"
      );
  
      console.log("Response from server:", response.data);
  
      if (response.data) {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].state.toLowerCase() === state.toLowerCase()) {
            for (let j = 0; j < response.data[i].districts.length; j++) {
              if (
                response.data[i].districts[j].name.toLowerCase() === city.toLowerCase()
              ) {
                console.log(response.data[i].districts[j]);
                setDistrictData(response.data[i].districts[j]);
                return;
              }
            }
          }
        }
        console.error("No matching district found for the given state and city");
      } else {
        console.error("Invalid data format received from the server");
      }
    } catch (error) {
      console.error("Error fetching district data:", error);
    }
  };

  const renderDetailModal = () => {
    if (!selectedAlert) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center backdrop-blur-sm">
        <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl">
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded-full transition-colors group"
          >
            <X
              size={24}
              className="group-hover:rotate-90 transition-transform"
            />
          </button>

          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            <AlertTriangle className="mr-3 text-blue-500" size={32} />
            {selectedAlert.type.charAt(0).toUpperCase() +
              selectedAlert.type.slice(1)}{" "}
            Alert Details
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6 bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-md">
                <h3 className="flex items-center text-lg font-semibold mb-2 text-gray-700">
                  <MapPin className="mr-2 text-blue-500" size={20} />
                  Location
                </h3>
                <p className="text-gray-600 font-medium">
                  {selectedAlert.location.city}, {selectedAlert.location.state},{" "}
                  {selectedAlert.location.country}
                </p>
              </div>

              <div className="mb-6 bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg shadow-md">
                <h3 className="flex items-center text-lg font-semibold mb-2 text-gray-700">
                  <Clock className="mr-2 text-blue-500" size={20} />
                  Timestamp
                </h3>
                <p className="text-gray-600 font-medium">
                  {formatDate(selectedAlert.timestamp)}
                </p>
              </div>

              <div className="mb-6 bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg shadow-md">
                <h3 className="flex items-center text-lg font-semibold mb-2 text-gray-700">
                  <ShieldCheck className="mr-2 text-blue-500" size={20} />
                  Additional Details
                </h3>
                <div className="space-y-2">
                  <p>
                    <strong>Severity:</strong>{" "}
                    {selectedAlert.criticality?.severity || "N/A"}
                  </p>
                  <p>
                    <strong>Credibility:</strong>{" "}
                    {selectedAlert.numberOfPosts || "N/A"}
                  </p>
                  <p>
                    <strong>Coordinates:</strong>
                    {` ${selectedAlert.location.coordinates.latitude}, ${selectedAlert.location.coordinates.longitude}`}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div>
                {districtData ? (
                  
                    <div
                      className="mb-6 bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg shadow-md"
                    >
                      <h3 className="flex items-center text-lg font-semibold mb-2 text-gray-700">
                        <ShieldCheck className="mr-2 text-blue-500" size={20} />
                        District Information
                      </h3>
                      <div className="space-y-2">
                        <p>
                          <strong>District Name:</strong>{" "}
                          {districtData.name || "N/A"}
                        </p>
                        <p>
                          <strong>Fire Department:</strong>{" "}
                          {districtData.fire_department.contact_number || "N/A"}
                        </p>
                        <p>
                          <strong>Police Contact:</strong>{" "}
                          {districtData.police_station.contact_number || "N/A"}
                        </p>
                        <p>
                          <strong>Hospital Contact:</strong>{" "}
                          {districtData.hospitals[0].contact_number || "N/A"}
                        </p>
                      </div>
                    </div>
                  
                ) : (
                  <p className="text-gray-500 italic">
                    No district information available for this state.
                    {/* {districtData.name} */}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-6"
        }
      >
        {data?.map((alert) => renderAlertCard(alert))}
      </div>
      {renderDetailModal()}
    </div>
  );
};

export default CardComponent;
