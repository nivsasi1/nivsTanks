import { Typography } from "@mui/material";
import { Graph } from "./components/Graph";
import { VerticalChart } from "./components/graphs/VerticalChart";
import { DoughnutChart } from "./components/graphs/DoughnutChart";
import { theme } from "../../themes/themePalatte";
import { useState } from "react";

type mainProps = {
  pernr: string;
  gdud: number;
  admin: boolean;
};

const MakatsData = [
  {
    id: 1,
    makat: 2016,
    userGain: 80000,
    precent: 823,
  },
  {
    id: 2,
    makat: 2017,
    userGain: 45677,
    precent: 345,
  },
  {
    id: 3,
    makat: 2018,
    userGain: 78888,
    precent: 555,
  },
  {
    id: 4,
    makat: 2019,
    userGain: 90000,
    precent: 4555,
  },
  {
    id: 5,
    makat: 2020,
    userGain: 4300,
    precent: 234,
  },
];

export const MainPage: React.FC<mainProps> = (props) => {
  const color = theme.palette.secondary.main;
  console.log(color);
  const [makatsData, setMakatsData] = useState({
    //labels is precentage
    labels: MakatsData.map((data) => data.makat.toString()),
    datasets: [
      {
        label: "כשירות לפי מק״ט",
        data: MakatsData.map((data) => data.precent),
        backgroundColor: color,
        borderRadius: 5,
      },
    ],
  });
  return (
    <>
      <div>
        <Typography
          variant="h5"
          sx={{ mt: "3rem", mr: "3rem", textAlign: "right", fontWeight: "600" }}
        >
          {"מחובר בתור " + props.pernr}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            mt: "0.2rem",
            mr: "3rem",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          {" "}
          {"גדוד " + props.gdud}{" "}
        </Typography>
      </div>
      <div
        className="graphs"
        style={{
          marginTop: "2rem",
          justifyContent: "space-evenly",
          flexDirection: "row-reverse",
          display: "flex",
        }}
      >
        <Graph flex={0.6} title="כשירות לפי מק״ט">
          <VerticalChart data={makatsData} />
        </Graph>
        <Graph flex={0.3} title="אחוזי כשירות">
          <DoughnutChart precent={70} />
        </Graph>
      </div>
    </>
  );
};
