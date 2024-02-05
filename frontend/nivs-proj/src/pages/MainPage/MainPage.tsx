import { Typography } from "@mui/material";
import { Graph } from "./components/Graph";
import { VerticalChart } from "./components/graphs/VerticalChart";
import { DoughnutChart } from "./components/graphs/DoughnutChart";
import { theme } from "../../themes/themePalatte";
import { useContext } from "react";
import { TankContext } from "../../store/tank-info-context";

type mainProps = {
  pernr: string;
  gdud: number;
  admin: boolean;
};



export const MainPage: React.FC<mainProps> = (props) => {
  const color = theme.palette.secondary.main;
  console.log(color);
  const tankData = useContext(TankContext)

  
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
          <VerticalChart data={tankData.verticalTanksInfo} />
        </Graph>
        <Graph flex={0.3} title="אחוזי כשירות">
          <DoughnutChart precent={tankData.doughnutChartInfo} />
        </Graph>
      </div>
      </>
  );
};
