import React from "react";
import { Box, Typography } from "@mui/material";

const LegendComponent = () => {
  return (
    <Box
    className="flex items-center gap-6 pl-4 rounded-lg shadow-sm"
    sx={{
      // background: "linear-gradient(135deg, #e0f7fa, #b3e5fc)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      // border: "1px solid #81d4fa",
    }}
  >
    <Typography
      variant="h6"
      className="font-bold underline"
      sx={{
        color: "#01579b",
        fontSize: "1.25rem",
        textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
      }}
    >
      Alert Levels
    </Typography>
    <Box className="flex items-center hover:animate-bounce">
      <Box
        className="w-5 h-5 rounded-full mr-2"
        sx={{
          background: "radial-gradient(circle, #ff8a80, #d32f2f)",
          boxShadow: "0px 4px 6px rgba(211, 47, 47, 0.5)",
        }}
      ></Box>
      <Typography
        variant="body2"
        className="font-medium"
        sx={{ color: "#b71c1c", fontWeight: "600" }}
      >
        Critical
      </Typography>
    </Box>
    <Box className="flex items-center hover:animate-bounce">
      <Box
        className="w-5 h-5 rounded-full mr-2"
        sx={{
          background: "radial-gradient(circle, #ffecb3, #ffb300)",
          boxShadow: "0px 4px 6px rgba(255, 179, 0, 0.5)",
        }}
      ></Box>
      <Typography
        variant="body2"
        className="font-medium"
        sx={{ color: "#ff6f00", fontWeight: "600" }}
      >
        Moderate
      </Typography>
    </Box>
    <Box className="flex items-center hover:animate-bounce">
      <Box
        className="w-5 h-5 rounded-full mr-2"
        sx={{
          background: "radial-gradient(circle, #b9f6ca, #00c853)",
          boxShadow: "0px 4px 6px rgba(0, 200, 83, 0.5)",
        }}
      ></Box>
      <Typography
        variant="body2"
        className="font-medium"
        sx={{ color: "#2e7d32", fontWeight: "600" }}
      >
        Low
      </Typography>
    </Box>
  </Box>
  
  );
};

export default LegendComponent;
