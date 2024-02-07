import React, { useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { TankContext } from "../../../../store/tank-info-context";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart: React.FC = () => {
  
  const { tankData } = useContext(TankContext);

  const data = {
    labels: ["סהכ כשירים"],
    datasets: [
      {
        label: "%",
        data: [tankData.doughnutChartInfo, 100 - tankData.doughnutChartInfo],
        backgroundColor: ["#899BF8", "#FFF"],
      },
    ],
  };

  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          borderRadius: "1rem",
          height: "200px",
          width: "100%",
          alignSelf: "center",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <Doughnut data={data} />
      </Box>
      <Typography style={{ direction: "rtl" }} mb={2}>
        {tankData.doughnutChartInfo + "%" + " מהכלים כשירים "}
      </Typography>
    </>
  );
};
