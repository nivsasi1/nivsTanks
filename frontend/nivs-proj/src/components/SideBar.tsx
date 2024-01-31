import { Box, Button } from "@mui/material"
import tankBG from "../assets/tank.png"
import logo from "../assets/zevet100.jpg"

export const SideBar: React.FC<{isAdministrator: boolean}> = ({isAdministrator}) => {
    return (
    <div style={{position:"relative", height:'100%', overflow: "hidden"}}>
                <img className="tankBGSideBar" src={tankBG} alt="background" />
                <img className="zevet100" src={logo} alt="zevetLogo" />
                <Box style={{display:"flex", flexDirection:"column", margin:"1rem"}}>
                    <Button 
                            size="large"
                            color="secondary"
                            variant="contained"
                            sx={{mt:'10rem'}}>
                                עמוד ראשי
                    </Button>
                    {isAdministrator&&
                    <Button size="large"
                            color="secondary"
                            variant="contained"
                            sx={{mt:'1rem'}}>הוספת צ</Button>}
                </Box>
    </div>
    )
}