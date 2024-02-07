import { createContext, useEffect, useState } from "react";
import { theme } from "../themes/themePalatte";
import {
  tank,
  tankData,
  children1,
  tankNumber,
  loginInfo,
} from "./context-types";
import React from "react";

const color = theme.palette.secondary.main;

const initialTanksData: [tank] = [
  {
    carNumber: "טוען",
    makat: "טוען",
    kshirot: false,
    gdud: "1",
  },
];

const initialVerticalTanksInfo = {
  //labels is precentage
  labels: ["a"],
  datasets: [
    {
      label: "אחוזי כשירות לפי מק״ט",
      data: [100],
      backgroundColor: color,
      borderRadius: 5,
    },
  ],
};

const initialTankData = {
  Tanks: initialTanksData,
  verticalTanksInfo: initialVerticalTanksInfo,
  doughnutChartInfo: 0,
  countKshir: 0,
};

const initialUserData = {
  isLogged: false,
  isManager: false,
  gdud: "",
  pernr: "",
};

export const TankContext = createContext({
  tankData: initialTankData,
  handleLogin: (
    _logged: boolean,
    _gdud: string,
    manager: string,
    _pernr: string
  ) => {},
  setMainPage: (v: boolean) => {},
  userData: initialUserData,
  handleLogOut: () => {},
});

export const loginTry = async (data: loginInfo) => {
  //workin pernr for text :8604191
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      mode: "cors",
    });
    return await response.json();
  } catch (e) {
    console.error(e);
    console.log("login failed");
    return { message: "something went wrong" };
  }
};

export const addTank = async (data: tankNumber) => {
  const response = await fetch("http://localhost:3000/addTank", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    credentials: "include",
  });
  let resData;
  try {
    resData = await response.json();
  } catch {
    console.log("problem");
  }
  if (!response.ok) {
    throw new Error("הוספה נכשלה, בעיה");
  }
  return resData ?? "error occured";
};

const getTanks = async () => {
  try {
    const response = await fetch("http://localhost:3000/tanks", {
      mode: "cors",
      credentials: "include",
    });
    return await response.json();
  } catch {
    console.log("something didnt work");
    return null;
  }
};
export const isLoggedIn = async () => {
  try {
    const response = await fetch("http://localhost:3000/isLoggedIn", {
      mode: "cors",
      credentials: "include",
    });
    return await response.json();
  } catch {
    console.log("not logged");
    return null;
  }
};

const handleLogOut = async () => {
  try {
    const response = await fetch("http://localhost:3000/logout", {
      method: "delete",
      mode: "cors",
      credentials: "include",
    });
    return await response.json();
  } catch {
    console.log("error");
    return null;
  }
};

export const TankContextProvider: React.FC<children1> = ({ children }) => {
  const [userData, setUserData] = useState({ ...initialUserData });
  const [isMainPage, setIsMainPage] = useState(false);
  const [tankData, setTankData] = useState<tankData>({ ...initialTankData });

  //checking if user logedin or not
  useEffect(() => {
    isLoggedIn().then((e) => {
      if (e && e.message == "authenticated")
        handleLogin(true, e.gdud, e.isManager, e.pernr);
      else {
        handleLogin(false, "", "0", "");
      }
    });
  }, []);

  //if loggedin and if in mainpage, fetch data
  useEffect(() => {
    if (userData.isLogged && isMainPage) {
      let doughnutChartInfo: number;

      let totalTanks = 0;
      let countKshir = 0;
      const turnDataUseable = (Tanks: [tank]) => {
        let tankTemp: any = {};
        // tankTemp, way of saving the data in a reorginized way, key is makat, and how many of each, how many kshirim

        Tanks.forEach((tank) => {
          if (!tankTemp[Number(tank.makat)]) {
            tankTemp[Number(tank.makat)] = {
              count: 1,
              countKshir: tank.kshirot ? 1 : 0,
            };
          } else {
            tankTemp[Number(tank.makat)].count += 1;
            tankTemp[Number(tank.makat)].countKshir += tank.kshirot ? 1 : 0;
          }

          totalTanks += 1;
          countKshir += tank.kshirot ? 1 : 0;
        });
        doughnutChartInfo = Math.floor((countKshir / totalTanks) * 100);

        //keys are the makats of the tanks
        const keys = Object.keys(tankTemp);
        
        const verticalTanksInfo = {
          labels: keys,
          datasets: [
            {
              label: "אחוזי כשירות לפי מק״ט",
              data: keys.map(
                (key) => (tankTemp[key].countKshir / tankTemp[key].count) * 100
              ),
              backgroundColor: color,
              borderRadius: 5,
            },
          ],
        };

        return { Tanks, verticalTanksInfo, doughnutChartInfo, countKshir };
      };
      
      getTanks()
        .then((data) => {
          setTankData(turnDataUseable(data));
        })
        .catch(console.error);
    }
  }, [userData.isLogged, isMainPage]);

  const handleLogin = (
    logged: boolean,
    _gdud: string,
    manager: string,
    _pernr: string
  ) => {
    setUserData((prev) => {
      return {
        isLogged: logged,
        gdud: _gdud,
        isManager: manager == "1",
        pernr: _pernr,
      };
    });
  };

  const setMainPage = (v: boolean) => {
    setIsMainPage(v);
  };

  return (
    <TankContext.Provider
      value={{
        tankData: tankData,
        handleLogin: handleLogin,
        setMainPage: setMainPage,
        userData: userData,
        handleLogOut: handleLogOut,
      }}
    >
      {children}
    </TankContext.Provider>
  );
};
