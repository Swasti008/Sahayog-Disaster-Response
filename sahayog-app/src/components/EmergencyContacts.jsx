import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { Phone, X } from "lucide-react";
import {
  MapPin,
  AlertTriangle,
  Globe,
  CloudRain,
  Shield,
  LayoutDashboard,
  Languages,
  Hospital,
} from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios"; // Make sure to install axios

function EmergencyContacts({
  openContactsDialog,
  handleCloseContactsDialog,
  CopyNumberTooltip,
}) {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [detectedState, setDetectedState] = useState("");

  // Fetch emergency data based on location
  const fetchEmergencyData = async (state = null) => {
    try {
      const params = state ? { state } : {};
      const response = await axios.get(
        "http://localhost:5000/emergency/getData",
        { params }
      );

      if (response.data && response.data.length > 0) {
        var data = "";
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].state == detectedState) {
            data = response.data[i];
            break;
          }
        }
        setStateData(data);
        console.log(data);
        var districtNames = "";
        if (data.districts) {
          districtNames = data.districts.map((district) => district.name);
          setDistricts(districtNames);
        }

        if (districtNames.length > 0) {
          setSelectedDistrict(districtNames[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching emergency data:", error);
      setLocationError(error);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          try {
            const geocodeResponse = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
            );

            const data = await geocodeResponse.json();
            const state = data.address.state;
            setDetectedState(state);

            fetchEmergencyData(state);
            console.log(state);
          } catch (error) {
            console.error("Error fetching location details:", error);
            fetchEmergencyData();
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationError(error);
          fetchEmergencyData();
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setLocationError(new Error("Geolocation not supported"));
      fetchEmergencyData();
    }
  }, [openContactsDialog]);

  if (!stateData || !detectedState || !stateData.emergency_numbers) {
    // fetchEmergencyData();
    return (
      <Dialog open={openContactsDialog} onClose={handleCloseContactsDialog}>
        <DialogContent>
          <div className="flex justify-center items-center">
            <p>Loading emergency contacts...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // console.log(stateData)

  // Get selected district data
  const selectedDistrictData = stateData.districts.find(
    (district) => district.name === selectedDistrict
  );

  return (
    <Dialog
      open={openContactsDialog}
      onClose={handleCloseContactsDialog}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: "16px",
          boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
        },
      }}
    >
      <DialogTitle
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-5"
        style={{
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      >
        <div className="flex items-center justify-center space-x-4">
          <Phone size={36} className="text-white/90" />
          <span className="text-2xl font-bold tracking-wide drop-shadow-md">
            {stateData.state} Emergency Contacts
          </span>
        </div>
        <button
          onClick={handleCloseContactsDialog}
          className="absolute top-4 right-4 bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded-full transition-colors group"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform" />
        </button>
      </DialogTitle>

      <DialogContent
        className="bg-gray-50 p-6 flex space-x-6"
        style={{
          maxHeight: "600px",
          overflow: "auto",
        }}
      >
        {/* State-Level Emergencies */}
        <div className="w-1/3 pr-4 border-r border-gray-200 mt-4">
          <h3 className="text-xl font-semibold mb-5 text-gray-800 pb-2 border-b border-gray-300">
            State Emergency Services
          </h3>
          <div className="space-y-4">
            {stateData || stateData != null
              ? [
                  {
                    icon: Shield,
                    iconColor: "text-blue-600",
                    bgColor: "bg-blue-100",
                    label: "Centralized Emergency",
                    number:
                      stateData.emergency_numbers.centralized_emergency_number,
                  },
                  {
                    icon: AlertTriangle,
                    iconColor: "text-red-600",
                    bgColor: "bg-red-100",
                    label: "Police",
                    number: stateData.emergency_numbers.police,
                  },
                  {
                    icon: CloudRain,
                    iconColor: "text-green-600",
                    bgColor: "bg-green-100",
                    label: "Fire Services",
                    number: stateData.emergency_numbers.fire_services,
                  },
                  {
                    icon: Phone,
                    iconColor: "text-purple-600",
                    bgColor: "bg-purple-100",
                    label: "Ambulance",
                    number: stateData.emergency_numbers.ambulance.join("/"),
                  },
                ].map((emergency, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                  >
                    <div className="flex items-center space-x-4">
                      <emergency.icon
                        className={`${emergency.iconColor} ${emergency.bgColor} p-2 rounded-lg`}
                        size={40}
                      />
                      <span className="text-gray-800 font-medium">
                        {emergency.label}
                      </span>
                    </div>
                    <CopyNumberTooltip number={emergency.number}>
                      <span className="font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                        {emergency.number}
                      </span>
                    </CopyNumberTooltip>
                  </div>
                ))
              : null}
          </div>
        </div>

        {/* District Contacts */}
        <div className="w-2/3 pl-4">
          <div className="mb-5 mt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">
              District Emergency Contacts
            </h3>
            <div className="flex flex-wrap gap-2 mb-5">
              {districts.map((district) => (
                <button
                  key={district}
                  onClick={() => setSelectedDistrict(district)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                    ${
                      selectedDistrict === district
                        ? "bg-blue-600 text-white scale-105 shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-blue-100 hover:scale-105"
                    }
                  `}
                >
                  {district}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4 pb-3 border-b border-gray-200">
                  <MapPin className="text-blue-600 mr-3" size={32} />
                  <h4 className="text-xl font-bold text-gray-800">
                    {selectedDistrict}
                  </h4>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {[
                    {
                      icon: CloudRain,
                      iconColor: "text-green-600",
                      bgColor: "bg-green-100",
                      title: "Fire Department",
                      emergency:
                        selectedDistrictData?.disaster_relief?.fire_relief
                          ?.helpine || stateData?.disaster_relief?.fire_relief?.helpline,
                      contact:
                        selectedDistrictData?.disaster_relief?.fire_relief
                          ?.control_room || stateData?.disaster_relief?.fire_relief?.control_room,
                    },
                    {
                      icon: AlertTriangle,
                      iconColor: "text-red-600",
                      bgColor: "bg-red-100",
                      title: "Police Station",
                      emergency:
                        selectedDistrictData?.police_station
                          ?.emergency_number || stateData?.emergency_numbers.centralized_emergency_number,
                      contact:
                        selectedDistrictData?.police_station?.contact_number ||
                        stateData?.emergency_numbers.centralized_emergency_number,
                    },
                    {
                      icon: Hospital,
                      iconColor: "text-blue-600",
                      bgColor: "bg-blue-100",
                      title: "Hospital",
                      emergency:
                        selectedDistrictData?.hospitals?.[0]?.name || stateData?.emergency_numbers.ambulance[0],
                      contact:
                        selectedDistrictData?.hospitals?.[0]?.contact_number ||
                        stateData?.emergency_numbers.ambulance[1],
                    },
                  ].map((section, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-xl border-l-4 hover:bg-white transition-all duration-300"
                      style={{ borderColor: section.iconColor }}
                    >
                      <div className="flex items-center mb-3">
                        <section.icon
                          className={`${section.iconColor} ${section.bgColor} p-2 rounded-lg mr-3`}
                          size={38}
                        />
                        <span className="font-bold text-gray-700">
                          {section.title}
                        </span>
                      </div>
                      <div className="text-gray-600">
                        <p className="font-medium mb-1">{section.emergency}</p>
                        <CopyNumberTooltip number={section.contact}>
                          <p className="text-sm text-gray-500 cursor-pointer hover:text-blue-600">
                            Contact: {section.contact}
                          </p>
                        </CopyNumberTooltip>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EmergencyContacts;
