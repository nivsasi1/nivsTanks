import { TextField, Typography } from "@mui/material";
import { Graph } from "./components/Graph";
import { VerticalChart } from "./components/graphs/VerticalChart";
import { DoughnutChart } from "./components/graphs/DoughnutChart";
import { theme } from "../../themes/themePalatte";
import { useContext, useState } from "react";
import { TankContext } from "../../store/tank-info-context";
import { TanksTable } from "./components/graphs/TanksTable.tsx";
import { ExtraInfo } from "./components/graphs/ExtraInfo.tsx";

type mainProps = {
  pernr: string;
  gdud: number;
  admin: boolean;
};

export const MainPage: React.FC<mainProps> = (props) => {
  const color = theme.palette.secondary.main;
  console.log(color);
  const { verticalTanksInfo, doughnutChartInfo } = useContext(TankContext);
  const [filter, setFilter] = useState("");

  const handleChange = (e: string) => {
    setFilter(e);
  };

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
        <Graph setFilter={handleChange} flex={0.6} title="כשירות לפי מק״ט">
          <VerticalChart data={verticalTanksInfo} />
        </Graph>
        <Graph setFilter={handleChange} flex={0.2} title="אחוזי כשירות">
          <DoughnutChart precent={doughnutChartInfo} />
        </Graph>
      </div>
      <div
        className="sort-table"
        style={{
          marginTop: "2rem",
          justifyContent: "space-evenly",
          flexDirection: "row-reverse",
          display: "flex",
        }}
      >
        <Graph
          setFilter={handleChange}
          table={true}
          flex={0.3}
          title="טבלת כשירות"
        >
          <TanksTable filter={filter} />
        </Graph>
        <ExtraInfo which={true} />
        <ExtraInfo which={false} />
      </div>
    </>
  );
};
