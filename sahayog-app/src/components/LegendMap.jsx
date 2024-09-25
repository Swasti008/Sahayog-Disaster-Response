import React from "react";
import { Box, Typography } from "@mui/material";

const LegendComponent = () => {
  return (
    <Box
      className="flex items-center gap-4 bg-gray-200 p-4 rounded-lg shadow-md"
      sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Typography variant="h6" className="text-gray-700 font-bold">
        Alert Levels
      </Typography>
      <Box className="flex items-center">
        <Box className="w-4 h-4 bg-red-600 rounded-full mr-2"></Box>
        <Typography variant="body2" className="text-gray-600">
          Critical
        </Typography>
      </Box>
      <Box className="flex items-center">
        <Box className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></Box>
        <Typography variant="body2" className="text-gray-600">
          Moderate
        </Typography>
      </Box>
      <Box className="flex items-center">
        <Box className="w-4 h-4 bg-green-500 rounded-full mr-2"></Box>
        <Typography variant="body2" className="text-gray-600">
          Low
        </Typography>
      </Box>
    </Box>
  );
};

export default LegendComponent;
