import { Typography } from "@mui/material"
import { Graph } from "./components/Graph"
import { VerticalChart } from "./components/graphs/VerticalChart"
import {verticalData} from "./types/chartData"
import { DoughnutChart } from "./components/graphs/DoughnutChart"

type mainProps = {
    pernr: string,
    gdud: number,
    chartData: verticalData
    admin: boolean
}

export const MainPage: React.FC <mainProps> = (props) => {
    return(
    <>
        <div>
            <Typography variant="h5" sx={{mt:"3rem", mr:"3rem",textAlign:"right", fontWeight:"600"}}>{  "מחובר בתור " + props.pernr }</Typography>
            <Typography variant="h4" sx={{mt:"0.2rem", mr:"3rem",textAlign:"right", fontWeight:"bold"}}> {  "גדוד " + props.gdud } </Typography>
        </div>
        <div className="graphs" style={{marginTop:"2rem", justifyContent:"space-evenly", flexDirection:"row-reverse", display:"flex"}}>
            <Graph flex={0.6} title="כשירות לפי מק״ט">
                <VerticalChart data={props.chartData} />
            </Graph>
            <Graph flex={0.3} title="אחוזי כשירות">
                <DoughnutChart precent={70} />
            </Graph>
        </div>
    </>
    )
}