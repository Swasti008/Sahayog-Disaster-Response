// import React from 'react'
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Slider from "@mui/material/Slider";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import { PieChart } from "@mui/x-charts/PieChart";


// function PieChartFunction() {
//     const [radius, setRadius] = React.useState(50);
//     const [itemNb, setItemNb] = React.useState(5);
//     const [skipAnimation, setSkipAnimation] = React.useState(false);

//     const handleItemNbChange = (event, newValue) => {
//       if (typeof newValue !== "number") {
//         return;
//       }
//       setItemNb(newValue);
//     };
//     const handleRadius = (event, newValue) => {
//       if (typeof newValue !== "number") {
//         return;
//       }
//       setRadius(newValue);
//     };
//   return (
//     <>
//       <Box sx={{ width: "100%" }}>
//         <PieChart
//           height={300}
//           series={[
//             {
//               data: mobileAndDesktopOS.slice(0, itemNb),
//               innerRadius: radius,
//               arcLabel: (params) => params.label ?? "",
//               arcLabelMinAngle: 20,
//               valueFormatter,
//             },
//           ]}
//           skipAnimation={skipAnimation}
//         />
//         <FormControlLabel
//           checked={skipAnimation}
//           control={
//             <Checkbox
//               onChange={(event) => setSkipAnimation(event.target.checked)}
//             />
//           }
//           label="skipAnimation"
//           labelPlacement="end"
//         />
//         <Typography id="input-item-number" gutterBottom>
//           Number of items
//         </Typography>
//         <Slider
//           value={itemNb}
//           onChange={handleItemNbChange}
//           valueLabelDisplay="auto"
//           min={1}
//           max={8}
//           aria-labelledby="input-item-number"
//         />
//         <Typography id="input-radius" gutterBottom>
//           Radius
//         </Typography>
//         <Slider
//           value={radius}
//           onChange={handleRadius}
//           valueLabelDisplay="auto"
//           min={15}
//           max={100}
//           aria-labelledby="input-radius"
//         />
//       </Box>
//     </>
//   );
// }

// export default PieChartFunction

import ApexCharts from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [2, 5, 2],
      options: {
        chart: {
          type: "donut",
        },
        colors: ["#FC5656", "#FFA500", "#11AF04"],
        plotOptions: {
          pie: {
            donut: {
              size: "55%", // Adjust the donut width, increase this value for a thicker donut
            },
          },
        },
        legend: {
          show: false, // Disable the legend
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 10000,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="donut"
            height={350}
          />
        </div>
      </div>
    );
  }
}

export default ApexChart;
