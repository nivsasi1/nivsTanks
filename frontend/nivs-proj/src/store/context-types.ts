import { verticalData } from "../pages/MainPage/types/chartData";

export type tank = {
    carNumber: string;
    makat: string;
    kshirot: boolean;
    gdud: string;
  };

  export type tankData = {
    Tanks: [tank];
    verticalTanksInfo: verticalData;
    doughnutChartInfo: number;
    countKshir: number;
  };
  export type children1 = {
    children: React.ReactNode;
  };
  export type tankNumber = {
    carNumber: number;
    makat: number;
    kshirot: number;
    gdud: number;
  };

  export type loginInfo = {
    username: number;
    password: string;
  };
  