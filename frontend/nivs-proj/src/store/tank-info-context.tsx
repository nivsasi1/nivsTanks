import { createContext, useEffect, useState } from "react";
import { theme } from "../themes/themePalatte";
import { verticalData } from "../pages/MainPage/types/chartData";

export const TankContext = createContext({
    
    verticalTanksInfo: {
        //labels is precentage
        labels: ['a'],
        datasets: [
            {
            label: "אחוזי כשירות לפי מק״ט",
            data: [100],
            backgroundColor: "#FFFF",
            borderRadius: 5,
            },
        ],
    },
    doughnutChartInfo: 0
});

export const getTanks = async () =>{
    const response = await fetch('http://localhost:3000/tanks')
    let resData
    try{
        resData = await response.json();
        //console.log(resData)
        return resData
    }catch{
        console.log("something didnt work")
    }
    if(!response.ok){
        throw new Error('לא מחובר')
    }
    return null
}




type children1 = {
    children : React.ReactNode;
}

type tank = {
  carNumber: { type: String, unique: true },
  makat: String,
  kshirot: Boolean,
  gdud: String,
}
type tankData = {verticalTanksInfo: verticalData, doughnutChartInfo: number} 

export const TankContextProvider:React.FC<children1> = ({ children }) => {
    const color = theme.palette.secondary.main;

    //let tankData : any
    const [tankData, setTankData] = useState<tankData>({
        verticalTanksInfo: {
            //labels is precentage
            labels: ['a'],
            datasets: [
              {
                label: "אחוזי כשירות לפי מק״ט",
                data: [100],
                backgroundColor: color,
                borderRadius: 5,
              },
            ],
          },
        doughnutChartInfo: 0
    })
    
    useEffect(()=>{
        let doughnutChartInfo : number
    
        let totalTanks = 0
        let countKshir = 0

        const fetchData = async () => {
            console.log(await getTanks())
            return await getTanks();
        }
        const turnDataUseable = (Tanks : [tank]) => {
            let tankTemp:any = {}
            
            Tanks.forEach((tank) => {
                
                if (!tankTemp[Number(tank.makat)])
                    {
                        tankTemp[Number(tank.makat)] = {count: 1, countKshir:tank.kshirot?1:0}
                    }
                else
                    {
                    tankTemp[Number(tank.makat)].count+=1
                    tankTemp[Number(tank.makat)].countKshir += tank.kshirot?1:0
                    }


                totalTanks += 1
                countKshir += tank.kshirot?1:0
            });
            doughnutChartInfo = (countKshir/totalTanks*100)

            const keys = Object.keys(tankTemp)
            const verticalTanksInfo = {
                //labels is precentage
                labels: keys,
                datasets: [
                  {
                    label: "אחוזי כשירות לפי מק״ט",
                    data: keys.map((key) => (tankTemp[key].countKshir/tankTemp[key].count*100)),
                    backgroundColor: color,
                    borderRadius: 5,
                  },
                ],
              };


            return {verticalTanksInfo, doughnutChartInfo}
        }
        fetchData().then(data => {setTankData(turnDataUseable(data))}).catch(console.error)
        
        
    },[])
   




    return <TankContext.Provider value={{verticalTanksInfo: tankData.verticalTanksInfo, doughnutChartInfo: tankData.doughnutChartInfo}}>
        {children}
    </TankContext.Provider>
}