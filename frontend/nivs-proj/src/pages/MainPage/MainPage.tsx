import { Typography } from "@mui/material";
import { Graph } from "./components/Graph";
import { VerticalChart } from "./components/graphs/VerticalChart";
import { DoughnutChart } from "./components/graphs/DoughnutChart";
import { useContext, useEffect, useState } from "react";
import { TankContext } from "../../store/tank-info-context";
import { TanksTable } from "./components/graphs/TanksTable.tsx";
import { ExtraInfo } from "./components/graphs/ExtraInfo.tsx";
import { useNavigate } from "react-router-dom";

export const MainPage: React.FC = () => {
  const { setMainPage, userData } = useContext(TankContext);

  //navigate to login page is user isnt loggedin
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.isLogged) {
      return navigate("/");
    }
  }, [userData]);

  const [filter, setFilter] = useState("");

  //for context to reload, setting the mainpage to false and true
  useEffect(() => {
    // setMainPage(false)
    setMainPage(true);
  }, [userData]);

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
          {"מחובר בתור " + userData.pernr}
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
          {"גדוד " + userData.gdud}{" "}
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
          <VerticalChart />
        </Graph>
        <Graph setFilter={handleChange} flex={0.2} title="אחוזי כשירות">
          <DoughnutChart />
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
