import { Box, Typography } from "@mui/material"
import { SideBar } from "../../components/SideBar"

type mainProps = {
    pernr: string,
    gdud: number
}

export const MainPage: React.FC <mainProps> = (prop) => {
    return(
    <Box  sx={{ display: 'flex', flexDirection: "row", width:"100vw", height:"100vh"}}>
        {/* change to secondary color the bg so cleaner */}
        <Box sx={{width:"15rem", height:"100vh", backgroundColor:"#899BF8"}}>
            <SideBar />
        </Box>
        <Box sx={{flexGrow:"1", height:"100vh", backgroundColor:"#FBFBFF"}}>
            <Typography variant="h5" sx={{mt:"3rem", mr:"3rem",textAlign:"right", fontWeight:"600"}}>{  "מחובר בתור " + prop.pernr }</Typography>
            <Typography variant="h4" sx={{mt:"0.2rem", mr:"3rem",textAlign:"right", fontWeight:"bold"}}> {  "גדוד " + prop.gdud } </Typography>
        </Box>
    </Box>
    )
}