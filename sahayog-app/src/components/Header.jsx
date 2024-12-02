import React from "react";
import { Box, Typography } from "@mui/material";
import Logo from "../assets/Logo.png"; // Your logo image

const Header = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #1E3A8A, #3B82F6)", // Gradient background
        color: "#fff", // White text
        py: { xs: 2, sm: 3 }, // Vertical padding
        display: "flex",
        justifyContent: "center", // Center content horizontally
        alignItems: "center", // Center content vertically
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)", // Light shadow for depth
      }}
    >
      <Box display="flex" alignItems="center" textAlign="center">
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: 120, // Moderate logo size,
            height: 120,
            marginRight: 20, // Space between logo and text
          }}
        />
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "28px", sm: "36px", md: "40px" }, // Balanced font size
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "1px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Subtle shadow
            }}
          >
            सहयोग NATIONAL DISASTER ALERT PORTAL
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "14px", sm: "18px", md: "20px" }, // Slightly larger subtext
              fontFamily: "'Roboto', sans-serif",
              letterSpacing: "0.5px",
              mt: 1, // Spacing above subtext
            }}
          >
            Stay informed. Stay safe. Your real-time disaster alert hub.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
