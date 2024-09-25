import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WarningIcon from "@mui/icons-material/Warning";
import VerifiedIcon from "@mui/icons-material/Verified";
import moment from "moment";
import Image from "../assets/image.png"; // Placeholder image
import FetchData from "./services/FetchData";

const CardComponent = ({data}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);


  const handleDetailClick = (alert) => {
    setSelectedAlert(alert);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAlert(null);
  };

  return (
    <>
      {data && data.map((e) => (
        <Card key={e._id} className="w-100 bg-gray-100 shadow-lg mb-4">
          <div className="p-4 m-0 bg-gray-300">
            <Typography
              variant="h6"
              className="bg-gray-500 text-white w-fit pr-2 pl-2 rounded-full font-bold mb-2"
            >
              {e.type?.charAt(0).toUpperCase() + e.type?.slice(1)}
            </Typography>

            <div className="flex justify-between m-5">
              <div>
                <Typography variant="body2" className="text-gray-600 mb-1">
                  <span className="font-semibold">Location:</span>{" "}
                  {e.location?.city ? `${e.location.city},` : ""}{" "}
                  {e.location?.state ? `${e.location.state},` : ""}{" "}
                  {e.location?.country}
                </Typography>

                <Typography
                  variant="body2"
                  className="text-gray-600 mb-1 flex gap-7"
                >
                  <span className="font-semibold">
                    Time: {moment(e.timestamp).format("h:mm A")}
                  </span>
                  <span className="font-semibold">
                    Date: {moment(e.timestamp).format("DD/MMM/YYYY")}
                  </span>
                </Typography>

                <Typography variant="body2" className="text-gray-600 mt-2">
                  <span className="font-semibold">Description:</span>{" "}
                  {e.description}
                </Typography>
              </div>
            </div>

            <div className="flex justify-between gap-6 w-fit mt-4 ">
              <Button
                variant="contained"
                color="primary"
                className="bg-blue-500 hover:bg-blue-600"
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="info"
                className="bg-cyan-500 hover:bg-cyan-600"
                onClick={() => handleDetailClick(e)}
              >
                Details
              </Button>
              <Button
                variant="contained"
                color="error"
                className="bg-red-500 hover:bg-red-600"
              >
                Reject
              </Button>
            </div>
          </div>
        </Card>
      ))}

      {selectedAlert && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h5" fontWeight="bold">
              {selectedAlert.type.charAt(0).toUpperCase() +
                selectedAlert.type.slice(1)}{" "}
              Alert
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>
                  <LocationOnIcon /> Location
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedAlert.location.city}, {selectedAlert.location.state},{" "}
                  {selectedAlert.location.country}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  <AccessTimeIcon /> Date and Time of Occurrence
                </Typography>
                <Typography variant="body1" paragraph>
                  {moment(selectedAlert.timestamp).format(
                    "DD/MMM/YYYY, h:mm A"
                  )}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  <VerifiedIcon /> Status
                </Typography>
                <Typography variant="body1" paragraph>
                   Not reviewed
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  <WarningIcon /> Severity
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedAlert.criticality?.severity ?selectedAlert.criticality.severity:"N/A"}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  Credibility Score
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedAlert.numberOfPosts || "N/A"}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  Coordinates
                </Typography>
                <Typography variant="body1" paragraph>
                  Latitude: {selectedAlert.location.coordinates.latitude},
                  Longitude: {selectedAlert.location.coordinates.longitude}
                </Typography>
              </Grid>

              <Grid item xs={12} md={4} className="media-section">
                <Typography variant="h6" gutterBottom>
                  Media Attachment
                </Typography>
                {selectedAlert.media ? (
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={Image}
                      alt="default"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
                    <IconButton
                      onClick={() =>
                        window.open(selectedAlert.media.url, "_blank")
                      }
                      color="primary"
                    >
                      Open Full Image
                    </IconButton>
                  </div>
                ) : (
                  <Typography>No media attached</Typography>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              variant="contained"
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CardComponent;
