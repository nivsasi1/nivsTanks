import React, { useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Typography } from "@mui/material";
import { TankContext } from "../../../../store/tank-info-context";
import { Labels } from "../../../../assets/constants";
import { theme } from "../../../../themes/themePalatte";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart: React.FC = () => {
  const { tankData } = useContext(TankContext);
  const doughnutColor = theme.palette.secondary.main;

  const data = {
    labels: [Labels.TOTAL_KSHIR],
    datasets: [
      {
        label: "%",
        data: [tankData.doughnutChartInfo, 100 - tankData.doughnutChartInfo],
        backgroundColor: [doughnutColor, theme.palette.paperBG.main],
      },
    ],
  };

  return (
    <>
      <Doughnut
        style={{ margin: "0 auto", width: "200px", height: "auto" }}
        data={data}
      />
      <Typography style={{ direction: "rtl" }} mb={2}>
        {tankData.doughnutChartInfo + "%" + Labels.FROM_KELIM}
      </Typography>
    </>
  );
};
