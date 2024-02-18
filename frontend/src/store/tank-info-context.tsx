import { createContext, useEffect, useState } from "react";
import {
  tank,
  tankData,
  children1,
} from "./context-types";
import React from "react";
import { Labels } from "../assets/constants";
import { isLoggedIn } from "./functions.ts";
import { initialTankData, initialUserData, color  } from "./initialData.ts";



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
              label: Labels.KSHIROT_PRECENT_BY_MAKAT,
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
