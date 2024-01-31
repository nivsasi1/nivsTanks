import { Box, Button } from "@mui/material";
import tankBG from "../assets/tank.png";
import logo from "../assets/zevet100.jpg";
import { NavLink } from "react-router-dom";

export const SideBar: React.FC<{ isAdministrator: boolean }> = ({
  isAdministrator,
}) => {
  let activebutton = 0
  return (
    <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
      <img className="tankBGSideBar" src={tankBG} alt="background" />
      <img className="zevet100" src={logo} alt="zevetLogo" />
      <Box style={{ display: "flex", flexDirection: "column", margin: "1rem" }}>
      <NavLink to="/main">
        {({ isActive }) => (
          <Button
            size="large"
            color={isActive? "paperBG" : "secondary"}
            variant="contained"
            fullWidth
            sx={{ mt: "10rem" }}
          >
            עמוד ראשי
          </Button>
        )}
        </NavLink>
        {isAdministrator && (
          <NavLink to="/addtank">
             {({ isActive }) => (
              <Button
              size="large"
              color={isActive? "paperBG" : "secondary"}
              fullWidth
              variant="contained"
              sx={{ mt: "1rem" }}
            >
            הוספת צ
            </Button>
            )}
          </NavLink>
        )}
      </Box>
    </div>
  );
};
