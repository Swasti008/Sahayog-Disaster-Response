import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import leaflet for custom icons
import "leaflet/dist/leaflet.css";
import {
  Card,
  CardContent,
  Snackbar,
  IconButton,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { MapPin } from "lucide-react";
import CloseIcon from "@mui/icons-material/Close";
import LegendComponent from "./LegendMap";
import moment from "moment";

// Custom Alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Function to create different colored icons based on severity
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
    iconSize: [25, 41], // Icon size
    iconAnchor: [12, 41], // Anchor the icon
    popupAnchor: [1, -34], // Anchor the popup to the icon
  });
};

const InteractiveMap = ({ disasters }) => {
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="w-full flex flex-col">
      <Card sx={{ marginBottom: 4 }}>
        <LegendComponent />

        <CardContent>
          <MapContainer
            center={[20.5937, 78.9629]} // Centered on India
            zoom={5}
            style={{ height: "60vh", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {disasters
              .filter(
                (disaster) =>
                  disaster.location?.coordinates && // Ensure coordinates object is available
                  disaster.location.coordinates.latitude !== null && // Check if latitude exists
                  disaster.location.coordinates.longitude !== null // Check if longitude exists
              )
              .map((disaster) => (
                <Marker
                  key={disaster.id}
                  position={[
                    disaster.location?.coordinates.latitude, // Extract latitude
                    disaster.location?.coordinates.longitude, // Extract longitude
                  ]} // Correct format for Leaflet's position prop
                  icon={getSeverityIcon(
                    disaster.criticatily?.severity || "high"
                  )} // Custom icon based on severity
                  eventHandlers={{
                    click: () => {
                      setSelectedDisaster(disaster);
                      setOpenSnackbar(true);
                    },
                  }}
                >
                  <Popup>
                    <strong>{disaster.type}</strong>
                    <br />
                    {disaster.location?.city}, {disaster.location?.state}
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </CardContent>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        sx={{ backgroundColor: "orange" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {selectedDisaster && (
          <Alert
            onClose={handleCloseSnackbar}
            severity={
              selectedDisaster.criticatily?.severity.toLowerCase() || "high"
            }
          >
            <MapPin style={{ marginRight: 8 }} />
            <Typography variant="h6">
              {selectedDisaster.type} Alert -{" "}
              {selectedDisaster.criticatily?.severity}
            </Typography>
            <Typography variant="body2">
              <strong>Location:</strong> {selectedDisaster.location?.city},{" "}
              {selectedDisaster.location?.state}
              <br />
              <strong>Description:</strong> {selectedDisaster.description}
              <br />
              <strong>Time:</strong> {moment(selectedDisaster?.timestamp).format("h:mm A")}{" "}
              {moment(selectedDisaster?.timestamp).format("DD/MMM/YYYY")}
            </Typography>
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default InteractiveMap;
