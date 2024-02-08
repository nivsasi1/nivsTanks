import { useContext } from "react";
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
import { Paper } from "@mui/material";
import { TankContext } from "../../../../store/tank-info-context";

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

export const VerticalChart: React.FC = () => {
  
  const { tankData } = useContext(TankContext);

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
      <Bar options={options} data={tankData.verticalTanksInfo} />
    </Paper>
  );
};
