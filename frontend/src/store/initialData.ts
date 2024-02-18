import { Data, Labels } from "../assets/constants";
import { theme } from "../themes/themePalatte";
import { tank } from "./context-types";

export const color = theme.palette.secondary.main;

const initialTanksData: [tank] = [
    {
      carNumber: Data.LOADING,
      makat: Data.LOADING,
      kshirot: false,
      gdud: "1",
    },
  ];
  
const initialVerticalTanksInfo = {
    //labels is precentage
    labels: ["a"],
    datasets: [
      {
        label: Labels.KSHIROT_PRECENT_BY_MAKAT,
        data: [100],
        backgroundColor: color,
        borderRadius: 5,
      },
    ],
  };
  
  export const initialTankData = {
    Tanks: initialTanksData,
    verticalTanksInfo: initialVerticalTanksInfo,
    doughnutChartInfo: 0,
    countKshir: 0,
  };
  
  export const initialUserData = {
    isLogged: false,
    isManager: false,
    gdud: "",
    pernr: "",
  };