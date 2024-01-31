import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { verticalData } from "../../types/chartData";
import { Paper } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  maintainAspectRatio: false,
};

type myProps = {
  data: verticalData;
};

export const VerticalChart: React.FC<myProps> = (prop) => {
  return (
    <Paper
      style={{
        borderRadius: "1rem",
        backgroundColor: "#F0F3FFa0",
        height: "200px",
        width: "90%",
        alignSelf: "center",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
      <Bar options={options} data={prop.data} />
    </Paper>
  );
};
