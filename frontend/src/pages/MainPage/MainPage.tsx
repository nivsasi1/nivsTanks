import { Box, Stack, Typography } from "@mui/material";
import { Graph } from "./components/Graph";
import { VerticalChart } from "./components/graphs/VerticalChart";
import { DoughnutChart } from "./components/graphs/DoughnutChart";
import { useContext, useEffect, useState } from "react";
import { TankContext } from "../../store/tank-info-context";
import { TanksTable } from "./components/graphs/TanksTable.tsx";
import { ExtraInfo } from "./components/graphs/ExtraInfo.tsx";
import { useNavigate } from "react-router-dom";
import { Graphs, Titles } from "../../assets/constants.tsx";

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

  useEffect(() => {
    setMainPage(true);
  }, [userData]);

  const handleChange = (e: string) => {
    setFilter(e);
  };

  return (
    <>
      <Box sx={{backgroundColor:'mainBG.main'}}>
        <Typography
          variant="h5"
          sx={{ mt: "3rem", mr: "3rem", textAlign: "right", fontWeight: "600", color: 'mainBG.contrastText'}}
        >
          {Titles.LOGGED_IN_AS + userData.pernr}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            mt: "0.2rem",
            mr: "3rem",
            textAlign: "right",
            fontWeight: "bold",
            color:'mainBG.contrastText'
          }}
        >
          {userData.isManager && Titles.MANAGER}
          {Titles.GDUD + userData.gdud}
        </Typography>
      </Box>
      <Stack
        direction={{ xs: "column", sm: "row-reverse" }}
        mt="2rem"
        justifyContent="space-evenly"
        sx={{backgroundColor:'mainBG.main'}}
      >
        <Graph
          setFilter={handleChange}
          flex={0.6}
          title={Graphs.KSHIR_BY_MAKAT}
        >
          <VerticalChart />
        </Graph>
        <Graph setFilter={handleChange} flex={0.2} title={Graphs.KSHIR_PRECENT}>
          <DoughnutChart />
        </Graph>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row-reverse" }}
        mt="2rem"
        justifyContent="space-evenly"
        sx={{backgroundColor:'mainBG.main'}}
      >
        <Graph
          setFilter={handleChange}
          table={true}
          flex={0.3}
          title={Graphs.KSHIR_TABLE}
        >
          <TanksTable filter={filter} />
        </Graph>

        <ExtraInfo which={true} />
        <ExtraInfo which={false} />
      </Stack>
    </>
  );
};
